// filepath: /c:/Users/verma/Desktop/Prescipto/admin/tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
    './public/index.html',
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5F6FFF'
      }
    },
  },
  plugins: [],
};

