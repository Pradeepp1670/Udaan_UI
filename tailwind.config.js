import('tailwindcss').Config
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend:{
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
    },
  },
  plugins: [],
}
}
