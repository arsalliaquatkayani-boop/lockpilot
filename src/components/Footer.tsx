import { Link } from "react-router-dom";
import { Container } from "./Container";
import { primaryNav } from "../config/navigation";
import { SITE, CURRENT_YEAR } from "../config/config";

export function Footer() {
  return (
    <footer className="border-t border-line py-12 text-[13.5px] text-slate">
      <Container className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="max-w-[280px]">
          <div className="flex items-center gap-2.5 font-heading font-extrabold text-[15px] text-navy mb-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-navy">
              <svg viewBox="0 0 128 128" className="h-3 w-3">
                <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke="#F8FAFC" strokeWidth="7" strokeLinecap="round" />
                <rect x="35" y="59" width="58" height="44" rx="9" fill="#F8FAFC" />
                <circle cx="64" cy="80" r="6" fill="#16A34A" />
                <rect x="61" y="80" width="6" height="13" rx="3" fill="#16A34A" />
              </svg>
            </span>
            LockPilot
          </div>
          <p>{SITE.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {primaryNav.map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-navy">
              {item.label}
            </Link>
          ))}
          <Link to="/download" className="hover:text-navy">Download App</Link>
          <Link to="/early-access" className="hover:text-navy">Request Early Access</Link>
          <Link to="/legal/privacy" className="hover:text-navy">Privacy</Link>
          <Link to="/legal/terms" className="hover:text-navy">Terms</Link>
        </nav>

        <div className="font-mono text-slate-light">
          © {CURRENT_YEAR} LockPilot. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
