/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textDecorationThickness: {
        'thick': '2px', // Custom thickness definition
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1025px', 'min':'767px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px', 'min':'600px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '600px'},
        // => @media (max-width: 639px) { ... }
      }
    },
    
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "*": {
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
        },
      });
    },
  ],
};
