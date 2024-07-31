/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        normal:'0.95rem'
      },
      colors:{
        'border-color':'#ebebeb',
        'primary':'#195bb0',
        'primary-hover':'#125cbd',
        'muted':'#626262'
      }
    },
  },
  plugins: [],
}

