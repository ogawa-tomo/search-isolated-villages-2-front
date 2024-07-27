/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx,mdx}'];
export const theme = {
  extend: {},
};
export const plugins = [require('daisyui')];
export const daisyui = {
  themes: [
    {
      corporate: {
        ...require('daisyui/src/theming/themes')['[data-theme=corporate]'],
        primary: '#009250',
      },
    },
  ],
};
