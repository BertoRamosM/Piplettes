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
          500: "#d63384",
          600: "#E6007E",
          700: "#f50057",
        },
        orangy: {
          500: "#fd7e14",
          600: "#F39200",
          700: "#ff6d00",
        },
        greeny: {
          500: "#198754",
          600: "#00c853",
          700: "#95C11F",
        },
      },
      keyframes: {
        "bell-ring": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(10deg)" },
        },
      },
      animation: {
        "bell-ring": "bell-ring 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
