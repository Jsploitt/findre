import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#202A44",
          50: "#f4f5f8",
          100: "#e4e7ee",
          600: "#2b3757",
          900: "#1a2139",
        },
        gold: {
          DEFAULT: "#AC9055",
          soft: "#c9b184",
          deep: "#8a7242",
        },
        mute: {
          DEFAULT: "#79858D",
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d9dde1",
        },
        cream: "#FAF8F4",
        ink: "#1A1F2E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 8px 24px -8px rgba(16,24,40,.08)",
        lift: "0 2px 4px rgba(16,24,40,.05), 0 20px 40px -16px rgba(16,24,40,.18)",
      },
      maxWidth: {
        shell: "1240px",
      },
      letterSpacing: {
        tightest: "-0.02em",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
