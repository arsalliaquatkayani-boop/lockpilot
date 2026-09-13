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
  secondary: { label: "Download App", path: "/download" },
  primary: { label: "Request Early Access", path: "/early-access" },
};

export const footerLinks: NavItem[] = [
  ...primaryNav,
  { label: "Download App", path: "/download" },
  { label: "Request Early Access", path: "/early-access" },
  { label: "Privacy", path: "/legal/privacy" },
  { label: "Terms", path: "/legal/terms" },
];
