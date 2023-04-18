import { Link } from "react-router-dom";

interface OmarProps {
  text: string;
  to: string;
}

const Omar = ({ text, to }: OmarProps) => {
  return (
    <Link
      to={to}
      className="p-main_back_btn_padding rounded-lg bg-back_btn_bg text-sm font-normal text-switcher_color"
    >
      {text}
    </Link>
  );
};

export default Omar;
