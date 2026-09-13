import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container } from "./Container";
import { Button } from "./Button";
import { primaryNav, navCtas } from "../config/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 font-heading font-extrabold text-[18px] text-navy">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-navy flex-shrink-0">
            <svg viewBox="0 0 128 128" className="h-3.5 w-3.5">
              <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke="#F8FAFC" strokeWidth="7" strokeLinecap="round" />
              <rect x="35" y="59" width="58" height="44" rx="9" fill="#F8FAFC" />
              <circle cx="64" cy="80" r="6" fill="#16A34A" />
              <rect x="61" y="80" width="6" height="13" rx="3" fill="#16A34A" />
            </svg>
          </span>
          LockPilot
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-[14.5px] text-slate">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors hover:text-navy ${isActive ? "text-navy font-medium" : ""}`
              }
              end={item.path === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button to={navCtas.secondary.path} variant="ghost">
            {navCtas.secondary.label}
          </Button>
          <Button to={navCtas.primary.path} variant="primary">
            {navCtas.primary.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-sm border border-line"
          onClick={() => setDrawerOpen(true)}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#0B1F33" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </Container>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <Container className="flex items-center justify-between py-4">
            <span className="font-heading font-extrabold text-[18px] text-navy">LockPilot</span>
            <button
              type="button"
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-line"
              onClick={() => setDrawerOpen(false)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="#0B1F33" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>
          </Container>
          <Container className="flex flex-col gap-1 pt-4">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                className="py-3 text-[17px] text-navy border-b border-line"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-6">
              <Button to={navCtas.secondary.path} variant="ghost" onClick={() => setDrawerOpen(false)} className="w-full">
                {navCtas.secondary.label}
              </Button>
              <Button to={navCtas.primary.path} variant="primary" onClick={() => setDrawerOpen(false)} className="w-full">
                {navCtas.primary.label}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
