/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003C43",
        secondary: "#E3FEF7",
      },
      container: {
        center: true,
        screens: {
          xl: "1280px",
        },
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      screens: {
        xs: "500px",
      },
    },
  },
  plugins: [],
};
