module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "yuzu-green": "#D2FF70",
        "yuzu-dark-green": "#1D3923",
        "yuzu-orange": "#F5A623",
        "yuzu-cream": "#FCF0E3",
      },
      boxShadow: {
        'custom': '0 0 20px rgba(0,0,0,0.1), 0 4px 0 rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
};
