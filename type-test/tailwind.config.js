/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
    },
    extend: {
      fontFamily: {
        "roboto": ['Roboto Mono', 'monospace']
    }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

