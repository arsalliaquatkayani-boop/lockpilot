// Brand tokens. These mirror the CSS custom properties defined in
// src/index.css (@theme). Import this file when a color value is needed in
// JS/TS logic (e.g. inline SVG fills) rather than a Tailwind class.

export const brand = {
  colors: {
    navy: "#111113",
    navyDeep: "#09090A",
    navySecondary: "#1C1C1F",
    emerald: "#3860FF",
    emeraldDeep: "#2445D6",
    emeraldSoft: "#E8ECFF",
    offwhite: "#FAFAF9",
    white: "#FFFFFF",
    slate: "#6B6B70",
    slateLight: "#9A9A9F",
    line: "#E6E5E2",
    danger: "#D6432B",
    dangerSoft: "#FBEAE5",
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
