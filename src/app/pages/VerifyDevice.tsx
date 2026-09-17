import { useEffect, useRef, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-center text-[22px] tracking-[0.5em] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";

export function VerifyDevice() {
  const { session, loading, deviceVerified, isPlatformAdmin, sendDeviceCode, verifyDeviceCode, signOut } =
    useAuth();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const sentRef = useRef(false);

  useEffect(() => {
    if (session && deviceVerified === false && !sentRef.current) {
      sentRef.current = true;
      sendDeviceCode();
    }
  }, [session, deviceVerified, sendDeviceCode]);

  if (!loading && !session) {
    return <Navigate to="/app/login" replace />;
  }

  if (deviceVerified === true) {
    return <Navigate to={isPlatformAdmin ? "/admin" : "/app"} replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const { error } = await verifyDeviceCode(code);
    setSubmitting(false);
    if (error) setFormError(error);
  }

  async function handleResend() {
    setFormError(null);
    setResent(false);
    const { error } = await sendDeviceCode();
    if (error) setFormError(error);
    else setResent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/lockpilot-mark-square.png" alt="" className="mb-4 h-14 w-14" />
          <div className="mb-1.5 font-heading text-[22px] font-extrabold text-offwhite">
            Verify this device
          </div>
          <div className="font-mono text-[12.5px] uppercase tracking-wide text-slate">
            New device detected
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line bg-navy-secondary p-6 shadow-[0_20px_60px_-30px_rgba(33,116,255,0.15)]"
        >
          <p className="mb-5 text-center text-[13.5px] text-slate">
            We've emailed a 6-digit code to <span className="text-offwhite">{session?.user.email}</span>.
            Enter it below to trust this device — you won't need to do this again here.
          </p>

          <div className="mb-5">
            <input
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className={inputClass}
              placeholder="------"
              autoFocus
            />
          </div>

          {formError && (
            <div className="mb-4 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {formError}
            </div>
          )}
          {resent && !formError && (
            <div className="mb-4 rounded-sm border border-emerald/30 bg-emerald-soft px-3 py-2 text-[13px] text-emerald">
              A new code has been sent.
            </div>
          )}

          <Button type="submit" variant="primary" disabled={submitting || code.length !== 6} className="w-full">
            {submitting ? "Verifying…" : "Verify"}
          </Button>

          <div className="mt-4 flex items-center justify-between text-[13px] text-slate">
            <button type="button" onClick={handleResend} className="text-emerald">
              Resend code
            </button>
            <button type="button" onClick={() => signOut()} className="text-slate">
              Sign out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
