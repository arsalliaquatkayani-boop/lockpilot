import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

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
          <img src="/lockpilot-mark-square.png" alt="" className="mb-4 h-14 w-14" />
          <div className="mb-1.5 font-heading text-[22px] font-extrabold text-offwhite">LockPilot</div>
          <div className="font-mono text-[12.5px] uppercase tracking-wide text-slate">
            Sign in to your dashboard
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line bg-navy-secondary p-6 shadow-[0_20px_60px_-30px_rgba(33,116,255,0.15)]"
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

          <div className="mt-4 text-center text-[13px] text-slate">
            New shop?{" "}
            <Link to="/app/register" className="text-emerald">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
