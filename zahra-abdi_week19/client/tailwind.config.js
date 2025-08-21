/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kalameh: ["Kalameh"],
        vazirmatn:["VazirMatn"],

      },
      colors:{
        back:"#F7F8F8",
        text:"#282828",
        bluecustom:"#55A3F0",
        graycustom:"#F2F2F2",
        graytwo:"#DFDFDF",
        redcustom:"#F43F5E",
        grayborder:"#E4E4E4",
        graycircle:"#8D8D8D80",

      },
    },
  },
  plugins: [],
}




