import { useState } from "react";
import type { ImageAsset } from "../config/images";

type ProductImageProps = ImageAsset & {
  className?: string;
  fit?: "cover" | "contain";
  label?: string;
};

// Renders a real photo when present; falls back to a labeled placeholder
// block when the file 404s, so the layout stays intentional and honest
// while the real asset is still being sourced.
export function ProductImage({
  src,
  alt,
  className = "",
  fit = "cover",
  label,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const filename = src.split("/").pop();

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 border border-dashed border-slate-light/60 bg-navy-secondary/[0.03] text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs font-mono text-slate">{label ?? "Image pending"}</span>
        <span className="text-[11px] font-mono text-slate-light">{filename}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} ${fit === "cover" ? "object-cover" : "object-contain"}`}
    />
  );
}
