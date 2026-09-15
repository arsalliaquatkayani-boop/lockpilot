// Brand tokens. These mirror the CSS custom properties defined in
// src/index.css (@theme). Import this file when a color value is needed in
// JS/TS logic (e.g. inline SVG fills) rather than a Tailwind class.

export const brand = {
  colors: {
    navy: "#1A1512",
    navyDeep: "#100D0A",
    navySecondary: "#211B16",
    emerald: "#D9A441",
    emeraldDeep: "#AD7E28",
    emeraldBright: "#F0C670",
    emeraldSoft: "#F8EDD9",
    offwhite: "#F5EEDD",
    white: "#FFFFFF",
    slate: "#B7A98F",
    slateLight: "#8A7C64",
    line: "rgba(217, 164, 65, 0.22)",
    danger: "#D0684F",
    dangerSoft: "rgba(208, 104, 79, 0.14)",
  },
  radius: {
    card: "12px",
    sm: "6px",
    pill: "999px",
  },
  fonts: {
    heading: "'Archivo', sans-serif",
    body: "'Work Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
};
