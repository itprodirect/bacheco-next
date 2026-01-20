# AWS Integration Guide

> **Version:** 1.0  
> **Last Updated:** January 19, 2026

---

## Overview

This document describes the AWS backend infrastructure for Bache & Co. The frontend (Next.js on Vercel) communicates with AWS services via API Gateway.

---

## Architecture

```
Vercel Frontend                    AWS Backend
┌──────────────┐                  ┌─────────────────────────────────────┐
│              │                  │                                     │
│  Next.js API │  HTTPS/JSON     │  API Gateway (REST)                 │
│  Routes      │────────────────▶│  /prod                              │
│  /api/*      │                  │                                     │
│              │                  │  ┌─────────────────────────────────┐│
└──────────────┘                  │  │ POST /orders                    ││
                                  │  │       ↓                         ││
                                  │  │ Lambda: orderHandler            ││
                                  │  │       ↓                         ││
                                  │  │ SES → Customer email            ││
                                  │  │ SES → Admin email               ││
                                  │  │ DynamoDB → Store order          ││
                                  │  └─────────────────────────────────┘│
                                  │                                     │
                                  │  ┌─────────────────────────────────┐│
                                  │  │ POST /contact                   ││
                                  │  │       ↓                         ││
                                  │  │ Lambda: contactHandler          ││
                                  │  │       ↓                         ││
                                  │  │ SES → Admin email               ││
                                  │  └─────────────────────────────────┘│
                                  │                                     │
                                  │  ┌─────────────────────────────────┐│
                                  │  │ GET /spot-price (optional)      ││
                                  │  │       ↓                         ││
                                  │  │ Lambda: spotPriceHandler        ││
                                  │  │       ↓                         ││
                                  │  │ External API or cached value    ││
                                  │  └─────────────────────────────────┘│
                                  └─────────────────────────────────────┘
```

---

## Services Used

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| API Gateway | REST API endpoints | 1M API calls/month |
| Lambda | Serverless functions | 1M requests/month, 400,000 GB-seconds |
| SES | Transactional email | 62,000 emails/month (from EC2) or $0.10/1000 |
| DynamoDB | Order storage | 25 GB storage, 25 RCU/WCU |
| CloudWatch | Logging & metrics | 5 GB logs, 10 custom metrics |

**Estimated Monthly Cost:** $0-5 for typical usage

---

## API Endpoints

### POST /orders

Creates a new order reservation and sends confirmation emails.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "product": "peace-1922-bu",
  "quantity": 5,
  "notes": "Optional message"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "orderId": "ORD-2026011912345",
  "message": "Order received. Please complete payment via wire transfer.",
  "wireInstructions": {
    "bankName": "Example Bank",
    "routingNumber": "XXXXXXXXX",
    "accountNumber": "XXXXXXXXXXXX",
    "accountName": "Bache & Co. LLC",
    "reference": "ORD-2026011912345",
    "paymentDeadline": "2026-01-22T00:00:00Z"
  },
  "orderSummary": {
    "product": "1922 Peace Dollar - Brilliant Uncirculated",
    "quantity": 5,
    "spotPriceAtOrder": 90.00,
    "pricePerCoin": 89.61,
    "totalPrice": 448.05
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "quantity": "Quantity must be at least 1"
  }
}
```

---

### POST /contact

Sends a contact form message to the admin.

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about shipping",
  "message": "Do you ship to Alaska?"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Message received. We'll respond within 24 hours."
}
```

---

### GET /spot-price

Returns the current silver spot price. (Optional - can use fallback in frontend)

**Response (200 OK):**
```json
{
  "spot": 90.15,
  "currency": "USD",
  "source": "manual",
  "timestamp": "2026-01-19T12:00:00Z",
  "fallback": false
}
```

---

## Environment Variables

### Vercel (Frontend)

```bash
# Required
NEXT_PUBLIC_CONTACT_EMAIL=nick@itprodirect.com
NEXT_PUBLIC_SITE_URL=https://bacheco.vercel.app

# AWS Integration (add when backend is ready)
AWS_API_BASE=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod

# Fallback spot price (used if API unavailable)
SPOT_PRICE_FALLBACK=90.00
```

### AWS Lambda (Backend)

```bash
# SES Configuration
SES_SENDER_EMAIL=nick@itprodirect.com
ADMIN_EMAIL=nick@itprodirect.com

# DynamoDB (if using)
ORDERS_TABLE_NAME=bacheco-orders

# Optional: External spot price API
SPOT_PRICE_API_URL=
SPOT_PRICE_API_KEY=
```

---

## Lambda Functions

### orderHandler

**File:** `lambda/orders/handler.js`

```javascript
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const ses = new AWS.SES();
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    
    // Validate input
    const errors = validateOrder(body);
    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Validation failed',
          details: errors
        })
      };
    }
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    
    // Calculate pricing
    const orderSummary = calculateOrderSummary(body.product, body.quantity);
    
    // Store order in DynamoDB (optional)
    if (process.env.ORDERS_TABLE_NAME) {
      await dynamodb.put({
        TableName: process.env.ORDERS_TABLE_NAME,
        Item: {
          orderId,
          ...body,
          ...orderSummary,
          status: 'pending_payment',
          createdAt: new Date().toISOString()
        }
      }).promise();
    }
    
    // Send customer confirmation email
    await sendCustomerEmail(body.email, body.name, orderId, orderSummary);
    
    // Send admin notification email
    await sendAdminEmail(body, orderId, orderSummary);
    
    // Return success response
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        orderId,
        message: 'Order received. Please complete payment via wire transfer.',
        wireInstructions: getWireInstructions(orderId),
        orderSummary
      })
    };
    
  } catch (error) {
    console.error('Order error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function validateOrder(body) {
  const errors = {};
  if (!body.name || body.name.trim().length < 2) {
    errors.name = 'Name is required';
  }
  if (!body.email || !isValidEmail(body.email)) {
    errors.email = 'Valid email is required';
  }
  if (!body.product) {
    errors.product = 'Product selection is required';
  }
  if (!body.quantity || body.quantity < 1) {
    errors.quantity = 'Quantity must be at least 1';
  }
  return errors;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getWireInstructions(orderId) {
  return {
    bankName: 'YOUR BANK NAME',
    routingNumber: 'XXXXXXXXX',
    accountNumber: 'XXXXXXXXXXXX',
    accountName: 'Bache & Co.',
    reference: orderId,
    paymentDeadline: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()
  };
}

// ... additional helper functions
```

### contactHandler

**File:** `lambda/contact/handler.js`

```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    
    // Validate input
    if (!body.name || !body.email || !body.message) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Name, email, and message are required'
        })
      };
    }
    
    // Send email to admin
    await ses.sendEmail({
      Source: process.env.SES_SENDER_EMAIL,
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL]
      },
      Message: {
        Subject: {
          Data: `[Bache & Co.] Contact Form: ${body.subject || 'General Inquiry'}`
        },
        Body: {
          Text: {
            Data: `
Name: ${body.name}
Email: ${body.email}
Subject: ${body.subject || 'General Inquiry'}

Message:
${body.message}
            `
          }
        }
      }
    }).promise();
    
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        message: 'Message received. We\'ll respond within 24 hours.'
      })
    };
    
  } catch (error) {
    console.error('Contact error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send message'
      })
    };
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
```

---

## CORS Configuration

API Gateway must be configured to allow requests from the Vercel domain.

**API Gateway CORS Settings:**
```yaml
AllowedOrigins:
  - https://bacheco.vercel.app
  - http://localhost:3000  # For local development
AllowedMethods:
  - POST
  - GET
  - OPTIONS
AllowedHeaders:
  - Content-Type
  - Authorization
```

**Lambda Response Headers:**
Each Lambda function should include CORS headers in responses (see code examples above).

---

## Deployment Options

### Option A: AWS SAM (Recommended)

**template.yaml:**
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Bache & Co. Backend

Globals:
  Function:
    Timeout: 10
    Runtime: nodejs20.x
    Environment:
      Variables:
        SES_SENDER_EMAIL: nick@itprodirect.com
        ADMIN_EMAIL: nick@itprodirect.com
        ALLOWED_ORIGIN: https://bacheco.vercel.app

Resources:
  OrderFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda/orders/
      Handler: handler.handler
      Policies:
        - SESCrudPolicy:
            IdentityName: nick@itprodirect.com
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable
      Events:
        OrderApi:
          Type: Api
          Properties:
            Path: /orders
            Method: post
            RestApiId: !Ref BachecoApi

  ContactFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda/contact/
      Handler: handler.handler
      Policies:
        - SESCrudPolicy:
            IdentityName: nick@itprodirect.com
      Events:
        ContactApi:
          Type: Api
          Properties:
            Path: /contact
            Method: post
            RestApiId: !Ref BachecoApi

  BachecoApi:
    Type: AWS::Serverless::Api
    Properties:
      StageName: prod
      Cors:
        AllowMethods: "'POST, GET, OPTIONS'"
        AllowHeaders: "'Content-Type'"
        AllowOrigin: "'https://bacheco.vercel.app'"

  OrdersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: bacheco-orders
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: orderId
          AttributeType: S
      KeySchema:
        - AttributeName: orderId
          KeyType: HASH

Outputs:
  ApiEndpoint:
    Description: API Gateway endpoint URL
    Value: !Sub https://${BachecoApi}.execute-api.${AWS::Region}.amazonaws.com/prod
```

**Deploy:**
```bash
sam build
sam deploy --guided
```

### Option B: Serverless Framework

**serverless.yml:**
```yaml
service: bacheco-backend

provider:
  name: aws
  runtime: nodejs20.x
  region: us-east-1
  environment:
    SES_SENDER_EMAIL: nick@itprodirect.com
    ADMIN_EMAIL: nick@itprodirect.com

functions:
  orders:
    handler: lambda/orders/handler.handler
    events:
      - http:
          path: orders
          method: post
          cors: true

  contact:
    handler: lambda/contact/handler.handler
    events:
      - http:
          path: contact
          method: post
          cors: true
```

**Deploy:**
```bash
serverless deploy
```

---

## SES Setup

### 1. Verify Email Address

```bash
aws ses verify-email-identity --email-address nick@itprodirect.com
```

Check your email and click the verification link.

### 2. (Optional) Move Out of Sandbox

For production, request production access to send to any email:
1. Go to AWS SES Console
2. Account Dashboard → Request Production Access
3. Fill out the form explaining your use case

### 3. Test Email Sending

```bash
aws ses send-email \
  --from nick@itprodirect.com \
  --to nick@itprodirect.com \
  --subject "Test Email" \
  --text "This is a test from Bache & Co. backend"
```

---

## Monitoring

### CloudWatch Logs

Each Lambda function automatically logs to CloudWatch. View logs at:
```
/aws/lambda/bacheco-OrderFunction
/aws/lambda/bacheco-ContactFunction
```

### CloudWatch Alarms (Recommended)

Create alarms for:
- Lambda errors > 5 in 5 minutes
- API Gateway 5xx errors > 10 in 5 minutes
- SES bounce rate > 5%

### API Gateway Metrics

Monitor in API Gateway console:
- Request count
- Latency
- Error rates

---

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Use IAM least privilege** - Lambda roles should only access required services
3. **Enable CloudTrail** - For audit logging
4. **Rate limiting** - Configure API Gateway throttling
5. **Input validation** - Validate all inputs in Lambda functions
6. **HTTPS only** - API Gateway enforces this by default

---

## Cost Estimation

| Service | Usage | Monthly Cost |
|---------|-------|--------------|
| API Gateway | 10,000 requests | $0.035 |
| Lambda | 10,000 invocations | $0.00 (free tier) |
| SES | 1,000 emails | $0.10 |
| DynamoDB | 100 orders stored | $0.00 (free tier) |
| CloudWatch | Basic logging | $0.00 (free tier) |
| **Total** | | **~$0.15** |

---

## Troubleshooting

### "Access Denied" on Lambda
- Check IAM role has SES and DynamoDB permissions
- Verify SES email is verified

### CORS Errors
- Ensure API Gateway CORS is configured
- Check Lambda returns CORS headers
- Verify origin matches exactly

### Emails Not Sending
- Check SES is out of sandbox (for non-verified recipients)
- Verify sender email is confirmed
- Check CloudWatch logs for errors

### API Gateway 500 Errors
- Check Lambda CloudWatch logs
- Verify environment variables are set
- Test Lambda function directly in console
