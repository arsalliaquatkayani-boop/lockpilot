import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[14.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

export function Register() {
  const { session, loading, signUp } = useAuth();
  const [shopName, setShopName] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmationSent, setConfirmationSent] = useState(false);

  if (!loading && session) {
    return <Navigate to="/app" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    const { error, needsEmailConfirmation } = await signUp({
      email,
      password,
      shopName,
      shopPhone,
      fullName,
    });
    setSubmitting(false);
    if (error) {
      setFormError(error);
      return;
    }
    if (needsEmailConfirmation) {
      setConfirmationSent(true);
    }
  }

  if (confirmationSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4">
        <div className="w-full max-w-[380px] text-center">
          <img src="/lockpilot-mark-square.png" alt="" className="mx-auto mb-4 h-14 w-14" />
          <div className="mb-2 font-heading text-[22px] font-extrabold text-offwhite">
            Check your email
          </div>
          <p className="text-[14.5px] text-slate">
            We've sent a confirmation link to <span className="text-offwhite">{email}</span>.
            Click it to activate your shop, then come back and sign in.
          </p>
          <Link
            to="/app/login"
            className="mt-6 inline-block font-mono text-[12.5px] uppercase tracking-wide text-emerald"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep px-4 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/lockpilot-mark-square.png" alt="" className="mb-4 h-14 w-14" />
          <div className="mb-1.5 font-heading text-[22px] font-extrabold text-offwhite">
            LockPilot
          </div>
          <div className="font-mono text-[12.5px] uppercase tracking-wide text-slate">
            Create your shop's account
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-card border border-line bg-navy-secondary p-6 shadow-[0_20px_60px_-30px_rgba(33,116,255,0.15)]"
        >
          <div className="mb-4">
            <label className={labelClass}>Shop name</label>
            <input
              required
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={inputClass}
              placeholder="Al-Rehman Mobiles"
            />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Shop phone</label>
            <input
              required
              value={shopPhone}
              onChange={(e) => setShopPhone(e.target.value)}
              className={inputClass}
              placeholder="03001234567"
            />
          </div>
          <div className="mb-4">
            <label className={labelClass}>Your name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
              placeholder="Owner's full name"
            />
          </div>
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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="At least 6 characters"
            />
          </div>

          {formError && (
            <div className="mb-4 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {formError}
            </div>
          )}

          <Button type="submit" variant="primary" disabled={submitting} className="w-full">
            {submitting ? "Creating account…" : "Create account"}
          </Button>

          <div className="mt-4 text-center text-[13px] text-slate">
            Already have an account?{" "}
            <Link to="/app/login" className="text-emerald">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
