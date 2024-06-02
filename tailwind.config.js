import { nextui } from "@nextui-org/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|chip|divider|dropdown|input|modal|navbar|skeleton|spinner|tabs|user|ripple|menu|popover).js",
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
}
