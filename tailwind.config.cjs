module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "ph-in": { max: "39.9375rem" },
        "ph-out": { min: "40rem" },
      },
    },
  },
  plugins: [],
};
