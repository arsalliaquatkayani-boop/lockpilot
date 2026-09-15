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
  // The whole site is dark now ("The Vault") — tone just picks how bright
  // the title reads: "dark" for the deepest-black panels, "light" everywhere
  // else on the warm near-black base.
  const titleColor = tone === "dark" ? "text-white" : "text-offwhite";
  const descColor = "text-slate";
  const eyebrowColor = "text-emerald";

  return (
    <div className={`flex flex-col gap-4 max-w-[620px] ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`font-mono text-[12.5px] uppercase tracking-[0.06em] ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`text-[30px] md:text-[40px] font-extrabold leading-[1.08] tracking-[-0.01em] ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-[16.5px] leading-relaxed ${descColor}`}>{description}</p>
      )}
    </div>
  );
}
