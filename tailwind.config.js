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
        bg: '#1AD7E3',
      },
      fontFamily: {
        sans: ['var(--font-garamond)'],
      },
      boxShadow: {
        'glow': '0 0 48px rgba(0, 0, 0, .25)',
        'dk': '0 0 12px rgba(0, 0, 0, .25)',
      }
    },
  },
  plugins: [],
}

