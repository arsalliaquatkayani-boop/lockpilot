import { Link } from "react-router-dom";
import { Container } from "./Container";
import { primaryNav } from "../config/navigation";
import { SITE, CURRENT_YEAR } from "../config/config";

export function Footer() {
  return (
    <footer className="border-t border-line py-12 text-[13.5px] text-slate">
      <Container className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="max-w-[280px]">
          <div className="flex items-center gap-2.5 font-heading font-extrabold text-[15px] text-offwhite mb-2">
            <img src="/lockpilot-mark-square.png" alt="" className="h-7 w-7 flex-shrink-0" />
            LockPilot
          </div>
          <p>{SITE.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12.5px]">
          {primaryNav.map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-emerald">
              {item.label}
            </Link>
          ))}
          <Link to="/app/login" className="hover:text-emerald">Login</Link>
          <Link to="/early-access" className="hover:text-emerald">Request Early Access</Link>
          <Link to="/legal/privacy" className="hover:text-emerald">Privacy</Link>
          <Link to="/legal/terms" className="hover:text-emerald">Terms</Link>
        </nav>

        <div className="font-mono text-slate-light">
          © {CURRENT_YEAR} LockPilot. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
