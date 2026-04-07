import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        quattro: {
          primary: "rgb(23, 84, 154)",
          "primary-light": "rgb(41, 112, 196)",
          "primary-dark": "rgb(14, 55, 105)",
          "primary-glow": "rgba(23, 84, 154, 0.3)",
          accent: "rgb(56, 189, 248)",
          "accent-2": "rgb(99, 210, 255)",
          surface: {
            dark: "rgb(8, 15, 30)",
            mid: "rgb(12, 22, 45)",
            light: "rgb(248, 250, 253)",
            white: "rgb(255, 255, 255)",
          },
          text: {
            primary: "rgb(240, 245, 255)",
            secondary: "rgb(148, 172, 209)",
            dark: "rgb(15, 23, 42)",
          },
          border: {
            dark: "rgba(23, 84, 154, 0.25)",
            light: "rgba(23, 84, 154, 0.12)",
          },
          success: "rgb(34, 197, 94)",
          error: "rgb(239, 68, 68)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(23, 84, 154, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(23, 84, 154, 0.7)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
