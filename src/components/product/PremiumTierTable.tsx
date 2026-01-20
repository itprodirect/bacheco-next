import type { Product } from "@/types/product";
import { getPremiumTiersDisplay } from "@/lib/pricing";

interface PremiumTierTableProps {
  product: Product;
  spotPrice: number;
}

export function PremiumTierTable({ product, spotPrice }: PremiumTierTableProps) {
  const tiers = getPremiumTiersDisplay(product, spotPrice);

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{
        backgroundColor: "var(--color-card)",
        borderColor: "var(--color-line)",
      }}
    >
      <table className="w-full">
        <thead>
          <tr style={{ backgroundColor: "var(--color-line)" }}>
            <th
              className="px-4 py-3 text-left text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Quantity
            </th>
            <th
              className="px-4 py-3 text-right text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Premium
            </th>
            <th
              className="px-4 py-3 text-right text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              Price/Coin
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, index) => (
            <tr
              key={tier.label}
              style={{
                borderTopWidth: index > 0 ? "1px" : "0",
                borderColor: "var(--color-line)",
              }}
            >
              <td
                className="px-4 py-3 text-sm"
                style={{ color: "var(--color-text)" }}
              >
                {tier.label}
              </td>
              <td
                className="px-4 py-3 text-sm text-right"
                style={{ color: "var(--color-muted)" }}
              >
                +${tier.premium.toFixed(2)}
              </td>
              <td
                className="px-4 py-3 text-sm text-right font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {tier.formattedPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
