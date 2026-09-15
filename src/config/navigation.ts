export type NavItem = {
  label: string;
  path: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Features", path: "/features" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Pricing", path: "/pricing" },
  { label: "FAQ", path: "/faq" },
];

export const navCtas = {
  login: { label: "Login", path: "/app/login" },
  primary: { label: "Request Early Access", path: "/early-access" },
};
