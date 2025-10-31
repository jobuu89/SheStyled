/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'shestyled-cream': '#F5F5DC',
        'shestyled-beige': '#F5DEB3',
        'shestyled-terracotta': '#CD853F',
        'shestyled-chocolate': '#8B4513',
        'shestyled-brown': '#A0522D',
        'shestyled-pink': '#FF69B4',
      },
    },
  },
  plugins: [],
}
