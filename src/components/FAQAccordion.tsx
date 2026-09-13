import { faqItems } from "../config/faq";

export function FAQAccordion() {
  return (
    <div className="border-t border-line">
      {faqItems.map((item) => (
        <details key={item.question} className="group border-b border-line py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-[16.5px] font-bold text-navy">
            {item.question}
            <span className="flex-shrink-0 font-mono text-[20px] leading-none text-slate-light transition-transform duration-200 group-open:rotate-45 group-open:text-emerald">
              +
            </span>
          </summary>
          <p className="mt-3.5 max-w-[640px] text-[14.5px] leading-relaxed text-slate">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
