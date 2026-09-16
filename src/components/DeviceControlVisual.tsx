export function DeviceControlVisual() {
  return (
    <div className="relative w-full max-w-[420px] py-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/[0.12] blur-[90px]" />

      {/* Phone, tilted like a product shot */}
      <div
        className="relative mx-auto w-[210px] rounded-[30px] bg-gradient-to-b from-[#1a2740] to-dark p-[3px] shadow-[0_40px_70px_-25px_rgba(19,33,58,0.45)]"
        style={{ transform: "rotate(-7deg)" }}
      >
        <span className="absolute right-[-3px] top-16 h-8 w-[3px] rounded-full bg-[#0a1424]" />
        <span className="absolute right-[-3px] top-28 h-12 w-[3px] rounded-full bg-[#0a1424]" />
        <div className="relative flex aspect-[9/18.7] flex-col items-center justify-center gap-3 overflow-hidden rounded-[27px] border border-white/5 bg-dark-navy px-6 text-center">
          <span className="absolute top-3 h-1.5 w-14 rounded-full bg-white/15" />

          <div className="mb-1 flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="1.8" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-semibold tracking-[0.1em] text-white">LOCKPILOT</span>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="var(--color-emerald-bright)" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" stroke="var(--color-emerald-bright)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="font-heading text-[14px] font-bold text-white">Device active</div>
          <div className="text-[11px] text-white/50">Plan is up to date</div>

          <div className="mt-3 flex w-full flex-col items-center gap-1.5">
            <span className="h-1.5 w-24 rounded-full bg-white/10" />
            <span className="h-1.5 w-16 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Floating status card, offset beside the phone */}
      <div className="absolute -right-2 bottom-2 w-[228px] rounded-card border border-line bg-navy-secondary p-4 shadow-[0_25px_50px_-20px_rgba(19,33,58,0.3)] sm:right-[-18px] sm:bottom-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate">Device status</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Active
          </span>
        </div>
        <div className="mb-3 font-heading text-[15px] font-bold text-offwhite">Samsung Galaxy A56</div>
        <div className="mb-4 flex flex-col gap-1.5 text-[12px]">
          <div className="flex justify-between">
            <span className="text-slate">Customer</span>
            <span className="font-medium text-offwhite">Muhammad Ahmed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate">Plan</span>
            <span className="font-medium text-offwhite">10 monthly installments</span>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex-1 rounded-sm bg-danger-soft py-2 text-center text-[11.5px] font-semibold text-danger">
            Lock device
          </span>
          <span className="flex-1 rounded-sm bg-success-soft py-2 text-center text-[11.5px] font-semibold text-success">
            Unlock device
          </span>
        </div>
      </div>
    </div>
  );
}
