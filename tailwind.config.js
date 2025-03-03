/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        brand: "#5AE4A8",
        "gray-700": "#25343B",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#25343B", // Gray-900 as primary
          secondary: "#25343B", // Gray-700 as secondary
          accent: "#5AE4A8", // Brand color as accent
          neutral: "#000000", // Neutral Black
          "base-100": "#ffffff", // Base color (white)
          info: "#3abff8", // Keep default info color
          success: "#36d399", // Keep default success color
          warning: "#fbbd23", // Keep default warning color
          error: "#f87272", // Keep default error color
        },
      },
      "light",
      "dark",
    ],
  },
};
