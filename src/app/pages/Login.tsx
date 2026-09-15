import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { brand } from "../../config/brand";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[14.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

export function Login() {
  const { session, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!loading && session) {
    return <Navigate to="/app" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) setFormError(error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm border border-emerald/60 bg-navy-secondary">
            <svg viewBox="0 0 128 128" className="h-6 w-6">
              <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke={brand.colors.offwhite} strokeWidth="7" strokeLinecap="round" />
              <rect x="35" y="59" width="58" height="44" rx="9" fill={brand.colors.offwhite} />
              <circle cx="64" cy="80" r="6" fill={brand.colors.emerald} />
              <rect x="61" y="80" width="6" height="13" rx="3" fill={brand.colors.emerald} />
            </svg>
          </span>
          <div className="mb-1.5 font-heading text-[22px] font-extrabold text-white">LockPilot</div>
          <div className="font-mono text-[12.5px] uppercase tracking-wide text-slate">
            Sign in to your dashboard
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line bg-navy-secondary p-6 shadow-[0_20px_60px_-30px_rgba(217,164,65,0.25)]"
        >
          <div className="mb-4">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@yourshop.com"
            />
          </div>
          <div className="mb-5">
            <label className={labelClass}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="••••••••"
            />
          </div>

          {formError && (
            <div className="mb-4 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {formError}
            </div>
          )}

          <Button type="submit" variant="primary" disabled={submitting} className="w-full">
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
