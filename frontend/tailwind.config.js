import rtl from "tailwindcss-rtl";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
    },
  },
  plugins: [rtl()],
};
