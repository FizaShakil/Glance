/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#201B16",
          deep: "#171310",
          soft: "#2C261F",
        },
        cream: {
          DEFAULT: "#FAF6EE",
          alt: "#F4EEE2",
          deep: "#EDE4D3",
        },
        sand: {
          DEFAULT: "#EAE0D0",
          deep: "#DCCDB7",
        },
        taupe: {
          DEFAULT: "#8A7F6F",
        },
        stone: {
          DEFAULT: "#5F574C",
        },
        line: "#E4DACE",
        plum: {
          DEFAULT: "#4A3A78",
          deep: "#33274F",
        },
        iris: {
          DEFAULT: "#6E5AA7",
          soft: "#EFEAF7",
          deep: "#57448C",
        },
        sage: "#7C8B6F",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "Cambria", "serif"],
        sans: ["Sen", "ui-sans-serif", "-apple-system", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        base: "14px",
        lg: "20px",
        xl: "28px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(32 27 22 / 0.04), 0 4px 14px 0 rgb(32 27 22 / 0.05)",
        card: "0 1px 3px rgb(32 27 22 / 0.05), 0 10px 28px rgb(32 27 22 / 0.07)",
        lift: "0 2px 4px rgb(32 27 22 / 0.05), 0 18px 44px rgb(32 27 22 / 0.13)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.7s ease-out both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ken-burns": "ken-burns 22s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
}