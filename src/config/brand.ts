// Brand tokens. These mirror the CSS custom properties defined in
// src/index.css (@theme). Import this file when a color value is needed in
// JS/TS logic (e.g. inline SVG fills) rather than a Tailwind class.

export const brand = {
  colors: {
    navy: "#1C1815",
    navyDeep: "#100D0A",
    navySecondary: "#2B241E",
    emerald: "#D9A441",
    emeraldDeep: "#AD7E28",
    emeraldSoft: "#F8EDD9",
    offwhite: "#FBF8F3",
    white: "#FFFFFF",
    slate: "#756A5D",
    slateLight: "#A69884",
    line: "#E9E1D3",
    danger: "#C6432E",
    dangerSoft: "#FAEAE3",
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
