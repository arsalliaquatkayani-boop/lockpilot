type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left";
  const titleColor = tone === "dark" ? "text-white" : "text-navy";
  const descColor = tone === "dark" ? "text-slate-light" : "text-slate";
  const eyebrowColor = tone === "dark" ? "text-emerald" : "text-emerald-deep";

  return (
    <div className={`flex flex-col gap-4 max-w-[620px] ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`font-mono text-[12.5px] uppercase tracking-[0.06em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-[32px] md:text-[38px] font-bold leading-[1.1] ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-[16.5px] leading-relaxed ${descColor}`}>{description}</p>
      )}
    </div>
  );
}
