/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F2D335',
        'neutral-00':'#FDFDFD',
        'neutral-20': '#CDCDCD',
        'neutral-40': '#828282',
        'neutral-60': '#6E6E6E',
        'neutral-80': '#3F3F3F',
        'neutral-90': '#1F1F1F',
        'neutral-100': '#0F0F0F',
      }
    },
    fontFamily: {
      'thunder': 'Thunder',
      'inter': 'Inter',
      'body': ['Inter','ui-sans-serif'],
      'sans': ['Inter','ui-sans-serif']
    },
    borderRadius: {
      '8': '8px',
      '16': '16px'
    }
  }
}

