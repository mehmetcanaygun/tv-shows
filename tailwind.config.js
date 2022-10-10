/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2FE6DE",
        secondary: "#18F2B2",
        light: "#EAFDF8",
        dark: "#1C3041",
      },
      keyframes: {
        rotateFull: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "rotate-full": "rotateFull 1s linear infinite",
      },
    },
    fontFamily: {
      Raleway: ["Raleway, sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "0",
      },
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "984px",
      xl: "1240px",
      "2xl": "1496px",
    },
  },
  plugins: [],
};
