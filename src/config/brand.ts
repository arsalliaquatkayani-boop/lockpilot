// Brand tokens. These mirror the CSS custom properties defined in
// src/index.css (@theme). Import this file when a color value is needed in
// JS/TS logic (e.g. inline SVG fills) rather than a Tailwind class.

export const brand = {
  colors: {
    navy: "#F4F6F9",
    navyDeep: "#F7F8FA",
    navySecondary: "#FFFFFF",
    emerald: "#2174FF",
    emeraldDeep: "#0D61EB",
    emeraldBright: "#4F94FF",
    emeraldSoft: "#EAF2FF",
    offwhite: "#13213A",
    white: "#FFFFFF",
    slate: "#69758B",
    slateLight: "#8B98A9",
    line: "#DCE2EB",
    danger: "#C4515F",
    dangerSoft: "#FFE5E7",
    warning: "#B5762E",
    warningSoft: "#FFF0DE",
    success: "#27825B",
    successSoft: "#E2F5EB",
    darkNavy: "#07142C",
    dark: "#0B1830",
  },
  radius: {
    card: "12px",
    sm: "8px",
    pill: "999px",
  },
  fonts: {
    heading: "'Manrope', sans-serif",
    body: "'DM Sans', sans-serif",
    mono: "'DM Sans', sans-serif",
  },
};
