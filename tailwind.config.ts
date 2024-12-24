import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        primaryBorder: "var(--primaryBorder)",
        primaryBackground: "var(--primaryBackground)",
        primaryGray: "var(--primaryGray)",
        secondaryGray: "var(--secondaryGray)",
        lightGray: "var(--lightGray)",
        primaryPurple: "var(--primaryPurple)",
      },
    },
  },
  plugins: [],
} satisfies Config;
