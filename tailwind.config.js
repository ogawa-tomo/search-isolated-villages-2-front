/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {},
};
export const plugins = [require('daisyui')];
const primaryColor = '#009250';
const paginationColor = '#91DBB9';
export const daisyui = {
  themes: [
    {
      corporate: {
        ...require('daisyui/src/theming/themes')['[data-theme=corporate]'],
        primary: primaryColor,
        '.bg-pagination': {
          'background-color': paginationColor,
        },
        '.bg-pagination:hover': {
          'background-color': primaryColor,
        },
        '.bg-pagination-dots': {
          'background-color': paginationColor,
        },
      },
    },
  ],
};
