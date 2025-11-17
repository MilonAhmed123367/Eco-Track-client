// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",   // আপনার সোর্স ফোল্ডার অনুযায়ী
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // আপনি যদি Tailwind এর extend করতে চান
        // তবে এখানে রঙ দিতে পারেন
      },
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],  // daisyUI থিম‑ভিত্তিক dark mode‑এর জন্য
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        mylight: {
          "primary": "#2E7D32",
          "primary-focus": "#1B5E20",
          "primary-content": "#ffffff",

          "secondary": "#FFB300",
          "secondary-focus": "#E6A700",
          "secondary-content": "#212121",

          "accent": "#37cdbe",
          "accent-focus": "#2aa79b",
          "accent-content": "#ffffff",

          "neutral": "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e0e0e0",
          "base-content": "#212121"
        }
      },
      {
        mydark: {
          "primary": "#1976d2",
          "primary-focus": "#115293",
          "primary-content": "#ffffff",

          "secondary": "#FFA000",
          "secondary-focus": "#FF8F00",
          "secondary-content": "#212121",

          "accent": "#4ADE80",
          "accent-focus": "#22C55E",
          "accent-content": "#ffffff",

          "neutral": "#1F2937",
          "neutral-focus": "#111827",
          "neutral-content": "#D1D5DB",

          "base-100": "#111827",
          "base-200": "#1E293B",
          "base-300": "#374151",
          "base-content": "#D1D5DB"
        }
      }
    ],
    defaultTheme: "mylight",
    darkTheme: "mydark",
  },
};
