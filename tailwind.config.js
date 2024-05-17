/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#27057d',
      },
      fontFamily: {
        sans: ['var(--font-garamond)'],
        serif: ['var(--font-jost)']
      },
      boxShadow: {
        'glow': '0 0 48px rgba(0, 0, 0, .25)',
        'dk': '0 0 36px rgba(0, 0, 0, .5)',
      },
      screens: {
        '3xl': '3840px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}

