import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <div className="mb-2 text-[20px] font-semibold text-white">LockPilot</div>
          <div className="text-[13.5px] text-slate-light">Sign in to your dashboard</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line-dark bg-navy-deep p-6"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-[13px] font-medium text-slate-light">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-line-dark bg-navy px-3 py-2.5 text-[14.5px] text-white outline-none focus:border-emerald"
              placeholder="you@yourshop.com"
            />
          </div>
          <div className="mb-5">
            <label className="mb-1.5 block text-[13px] font-medium text-slate-light">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-line-dark bg-navy px-3 py-2.5 text-[14.5px] text-white outline-none focus:border-emerald"
              placeholder="••••••••"
            />
          </div>

          {formError && (
            <div className="mb-4 rounded-sm border border-danger/40 bg-danger-soft/10 px-3 py-2 text-[13px] text-danger">
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-sm bg-emerald px-6 py-3 text-[14.5px] font-semibold text-white transition-all hover:bg-emerald-deep disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
