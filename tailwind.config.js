/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
        colors: {
        magenta: {
          500: '#d63384',
          600: '#c2185b',
          700: '#f50057',
        },
        orange: {
          500: '#fd7e14',
          600: '#f57c00',
          700: '#ff6d00',
        },
        green: {
          500: '#198754',
          600: '#388e3c',
          700: '#00c853',
        },
      },
    },
  },
  plugins: [],
};
