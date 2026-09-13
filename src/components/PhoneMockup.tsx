import type { ReactNode } from "react";

export function PhoneMockup({
  children,
  screenClassName = "",
  className = "",
}: {
  children: ReactNode;
  screenClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-[280px] rounded-[26px] border border-line bg-white p-4 shadow-[0_40px_80px_-36px_rgba(11,31,51,0.35),0_10px_28px_-14px_rgba(11,31,51,0.16)] ${className}`}
    >
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden rounded-[18px] px-5 py-6 text-center transition-colors duration-500 ${screenClassName}`}
        style={{ aspectRatio: "9 / 13.4" }}
      >
        <span className="absolute top-3.5 left-1/2 h-[5px] w-11 -translate-x-1/2 rounded-full bg-white/15" />
        {children}
      </div>
    </div>
  );
}
