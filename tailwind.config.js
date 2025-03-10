/** @type {import('tailwindcss').Config} */
export const content = [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
    extend: {
        colors: {
            primary: '#FF5733', // Custom color
            secondary: '#33FF57',
        },
    },
};
export const plugins = [require("daisyui")];