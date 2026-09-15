export type PricingTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  deviceCap: number;
  highlight?: boolean;
  includes: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "Rs 12,000",
    period: "/ month",
    deviceCap: 15,
    includes: [
      "Up to 15 active devices",
      "Automatic lock/unlock",
      "Customer & device management",
      "Installment tracking",
      "Manual override",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "Rs 25,000",
    period: "/ month",
    deviceCap: 50,
    highlight: true,
    includes: [
      "Up to 50 active devices",
      "Everything in Starter",
      "Financial dashboard",
      "Overdue monitoring",
      "Lock/unlock audit logs",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rs 45,000",
    period: "/ month",
    deviceCap: 120,
    includes: [
      "Up to 120 active devices",
      "Everything in Growth",
      "Priority support",
    ],
  },
];

export const pricingNote = "Prices in Pakistani Rupees, billed monthly via bank transfer.";
