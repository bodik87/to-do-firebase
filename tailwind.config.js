/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-yellow": "#D08F0C",
        "my-violet": "#6146C1",
        "my-beige": "#F6ECC9",
      },
    },
  },
  plugins: [],
};
