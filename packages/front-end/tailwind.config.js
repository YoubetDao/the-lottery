module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yuzu-green": "#98E82E",
        "yuzu-dark-green": "#1D3923",
        "yuzu-orange": "#F5A623",
        "yuzu-cream": "#FFF8E7",
      },
      boxShadow: {
        'custom': '0 0 20px rgba(0,0,0,0.1), 0 4px 0 rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
};
