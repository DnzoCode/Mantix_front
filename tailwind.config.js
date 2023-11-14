/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple": "rgb(4, 6, 34)",
        "primary-gray": "rgb(241, 243, 247)",
      },
    },
  },
  plugins: [],
};
