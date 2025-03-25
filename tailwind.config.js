
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        latto: ["Latto", "sans-serif"],
        Merriweather: ["Merriweather", "sans-serif"],
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein: "slidein 1s ease var(--slidein-delay,0) forwards",
      },
      colors: {
        "profile-bg": "#F8F7FF",
        "profile-text": "#1A1A1A",
        "profile-label": "#666666",
        "profile-purple": "#6366F1",
      },
      backgroundImage: {
        "gradient-profile": "linear-gradient(135deg, #EEF2FF 0%, #F1F5F9 100%)",
      },
    },
  },
  plugins: [],
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-in-out",
        "bounce": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
 
