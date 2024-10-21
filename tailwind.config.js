/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./formkit.config.js", "formkit-theme.ts", "domains/**/*.vue"],
  safelist: [],
  theme: {
    extend: {
      keyframes: {
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },

        "bounce-left": {
          "0%, 100%": {
            transform: "translateX(25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateX(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "bounce-right": "bounce-right 1s infinite",
        "bounce-left": "bounce-left 1s infinite",
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@formkit/themes/tailwindcss"),

    plugin(function ({ addVariant }) {
      addVariant("active-link", "&.router-link-active");
      addVariant("same-link", "&.router-link-same-active");
      addVariant("exact-link", "&.router-link-exact-active");
      addVariant("inactive-link", "&:not(.router-link-active)");
    }),
  ],
};
