/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add any other folders with .tsx/.js files
  ],
  theme: {
    extend: {
      colors: {
        // A set of complementary colors for a cooking recipes theme:
        brand: {
          primary: "#FF8133",  // Warm orange (main brand color)
          secondary: "#2ECC71", // Bright complementary green
          accent: "#F1C40F", // A golden/yellow accent for highlights
          neutral: "#f7f7f7",  // Soft off-white background
          dark: "#2c3e50",     // Deep navy/charcoal for headings or footer
        },
        // Optionally, create shortcuts if you prefer:
        "spicy-orange": "#FF8133",
        "basil-green": "#2ECC71",
        "golden-yellow": "#F1C40F",
        "charcoal-dark": "#2c3e50",
      },
      fontFamily: {
        // Example custom fonts for a cozy cooking vibe
        sans: ["Open Sans", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}
