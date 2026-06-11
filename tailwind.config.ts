import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: { dark: "#0F172A", blue: "#2563EB", green: "#22C55E" }
      }
    },
  },
  plugins: [],
};
export default config;
