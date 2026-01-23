import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PriceCalculator } from "@/components/product/PriceCalculator";
import { PremiumTierTable } from "@/components/product/PremiumTierTable";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { SpotPriceBanner } from "@/components/shared/SpotPriceBanner";
import { Badge } from "@/components/ui/Badge";
import productData from "@/data/products.json";
import type { ProductCatalog } from "@/types/product";

const catalog = productData as ProductCatalog;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return catalog.products.map((product) => ({
    slug: product.sku,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = catalog.products.find((p) => p.sku === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.shortName,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = catalog.products.find((p) => p.sku === slug);

  if (!product) {
    notFound();
  }

  const spotPrice = catalog.spotPriceFallback;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" style={{ color: "var(--color-muted)" }}>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: "var(--color-text)" }}>{product.shortName}</span>
      </nav>

      {/* Spot Price Banner */}
      <div className="mb-8">
        <SpotPriceBanner spotPrice={spotPrice} isFallback={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Product Info */}
        <div>
          {/* Product Images */}
          <div className="mb-6">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Badges */}
          <div className="flex gap-2 mb-4">
            {product.inStock ? (
              <Badge variant="success">In Stock</Badge>
            ) : (
              <Badge variant="error">Out of Stock</Badge>
            )}
            {product.featured && <Badge>Featured</Badge>}
          </div>

          {/* Product Name */}
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {product.name}
          </h1>

          {/* Description */}
          <p className="mb-6" style={{ color: "var(--color-muted)" }}>
            {product.description}
          </p>

          {/* Specs */}
          <div
            className="rounded-lg border p-4 mb-6"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-line)",
            }}
          >
            <h3
              className="font-semibold mb-3"
              style={{ color: "var(--color-text)" }}
            >
              Specifications
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt style={{ color: "var(--color-muted)" }}>Silver Content</dt>
                <dd style={{ color: "var(--color-text)" }}>
                  {product.weightOz} oz
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: "var(--color-muted)" }}>Purity</dt>
                <dd style={{ color: "var(--color-text)" }}>
                  {(product.purity * 100).toFixed(0)}% Silver
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ color: "var(--color-muted)" }}>Condition</dt>
                <dd style={{ color: "var(--color-text)" }}>
                  Brilliant Uncirculated (Raw)
                </dd>
              </div>
            </dl>
          </div>

          {/* Premium Tier Table */}
          <div>
            <h3
              className="font-semibold mb-3"
              style={{ color: "var(--color-text)" }}
            >
              Volume Pricing
            </h3>
            <PremiumTierTable product={product} spotPrice={spotPrice} />
          </div>
        </div>

        {/* Right Column: Price Calculator */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <PriceCalculator product={product} spotPrice={spotPrice} />
        </div>
      </div>
    </div>
  );
}
