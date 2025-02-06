/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',    // Flowbite JS files
    './src/**/*.{html,js,vue}',           // Your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),  // Ensure Flowbite plugin is included
  ],
};
