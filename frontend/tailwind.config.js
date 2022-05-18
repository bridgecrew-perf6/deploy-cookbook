
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend : {
      variants: {
        animation: ["motion-safe"]
      },
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },

      fontFamily: {
        Lobster: ['Lobster', 'cursive'],
        Caveat: ['Caveat'],
        QuickSand : ['QuickSand']
      },
      backgroundSize: {
        'size-200': '200% 200%',
    },
    backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
    },
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
