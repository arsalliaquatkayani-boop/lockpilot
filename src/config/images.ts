// Central registry of image assets used across the site.
//
// Files live in /public/assets/images/... (NOT src/) so a missing file
// 404s gracefully at runtime instead of breaking the Vite build. The
// <ProductImage> component (src/components/ProductImage.tsx) falls back to a
// labeled placeholder block when a path 404s, so the site stays fully
// functional and clearly communicates what belongs where until the real
// files are dropped in.
//
// To wire in a real photo: save it at the exact path listed below (same
// filename, .jpg). Nothing else needs to change.

export type ImageAsset = {
  src: string;
  alt: string;
};

export const images = {
  heroHandover: {
    src: "/assets/images/retail/hero-handover.jpg",
    alt: "A mobile shop retailer in Pakistan handing a customer a new phone and its box at the sales counter",
  },
  retailLedgerCheck: {
    src: "/assets/images/retail/shop-ledger.jpg",
    alt: "A shop owner cross-checking a customer's installment record in a handwritten ledger against his phone",
  },
  retailBoutiqueDaytime: {
    src: "/assets/images/retail/shop-boutique-daytime.jpg",
    alt: "A modern mobile phone shop interior in Pakistan with a retailer working on a laptop at the counter",
  },
  retailNightHandover: {
    src: "/assets/images/retail/shop-night-handover.jpg",
    alt: "Two men exchanging a phone at a shop counter at night, with an illuminated landmark in the background",
  },
  retailLaptopFlag: {
    src: "/assets/images/retail/shop-laptop-flag.jpg",
    alt: "A retailer recording a sale on a laptop in a branded mobile shop, Pakistani flag visible in the background",
  },
} satisfies Record<string, ImageAsset>;
