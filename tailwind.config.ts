import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        colorSky: "#C3EBFA",
        colorSkyLight: "#EDF9FD",
        colorPurple: "#CFCEFF",
        colorPurpleLight: "#F1F0FF",
        colorYellow: "#FAE27C",
        colorYellowLight: "#FEFCE8",
        colorOffWhite: "#F7F8FA",
      },
    },
  },
  plugins: [],
};
export default config;
