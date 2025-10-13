// ✅ postcss.config.cjs — Configuration correcte pour TailwindCSS v4
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // ⚡ le bon plugin !
    autoprefixer: {},
  },
};

