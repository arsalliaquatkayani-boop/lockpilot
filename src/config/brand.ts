// Brand tokens. These mirror the CSS custom properties defined in
// src/index.css (@theme). Import this file when a color value is needed in
// JS/TS logic (e.g. inline SVG fills) rather than a Tailwind class.

export const brand = {
  colors: {
    navy: "#0B1F33",
    navyDeep: "#071A2B",
    navySecondary: "#102A43",
    emerald: "#16A34A",
    emeraldDeep: "#0F7A38",
    emeraldSoft: "#DCFCE7",
    offwhite: "#F8FAFC",
    white: "#FFFFFF",
    slate: "#64748B",
    slateLight: "#94A3B8",
    line: "#E2E8F0",
    danger: "#DC2626",
    dangerSoft: "#FEE2E2",
  },
  radius: {
    card: "12px",
    sm: "8px",
    pill: "999px",
  },
  fonts: {
    heading: "'Manrope', 'Inter', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
};
