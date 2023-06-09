/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        auth_bg_main_color: "#F7F9FB",
        border_Color: "#D1D5DB",
        chat_Input_Bg: "rgba(255, 255, 255 , 0.3)",
        main_color: "#1c1c1c",
        btn_border_color: "rgba(0, 0, 0, 0.1)",
        placeholder_color: "rgba(0, 0, 0, 0.2)",
        switcher_color: "rgba(0, 0, 0, 0.4)",
        back_btn_bg: "rgba(0, 0, 0, 0.05)",
        links_color: "#95A4FC",
      },
      fontFamily: {
        Inter: "inter , sans-serif",
      },
      padding: {
        main_btn_padding: "4px 12px",
        main_input_padding: "8px 16px",
        main_back_btn_padding: "4px 8px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
