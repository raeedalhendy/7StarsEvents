/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        customBlack: '#1D1D1B',
        BLUE: '#0078d7',
      }
    },
    
  },
  plugins: [],
  darkMode :"class",
  
}

