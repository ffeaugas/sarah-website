import { defineConfig } from "@tailwindcss/vite";

export default defineConfig({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        prata: ["Prata", "serif"],
        "host-grotesk": ["HostGrotesk", "sans-serif"],
      },
    },
  },
});
