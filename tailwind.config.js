/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,ts,jsx,tsx,mdx}"];
const primaryColor = "#009250";
const lightenedPrimaryColor = "#C6EDDB";
const paginationColor = "#91DBB9";
export const theme = {
  fontFamily: {
    sans: ["var(--font-noto-sans-jp)"],
  },
  extend: {
    colors: {
      "primary-color": primaryColor,
      "lightened-primary-color": lightenedPrimaryColor,
    },
  },
};
export const plugins = [require("daisyui")];
export const daisyui = {
  themes: [
    {
      corporate: {
        ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
        primary: primaryColor,
        ".bg-pagination": {
          "background-color": paginationColor,
        },
        ".bg-pagination:hover": {
          "background-color": primaryColor,
        },
        ".bg-pagination-dots": {
          "background-color": paginationColor,
        },
      },
    },
  ],
};
