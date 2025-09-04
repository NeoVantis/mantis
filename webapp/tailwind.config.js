// The mantis-ui source path can be configured via the MANTIS_UI_SRC_PATH environment variable.
// If not set, it defaults to '../mantis-ui/src/**/*.{js,ts,jsx,tsx}'.
const mantisUiSrcPath = process.env.MANTIS_UI_SRC_PATH || "../mantis-ui/src/**/*.{js,ts,jsx,tsx}";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    mantisUiSrcPath
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}