import { Link } from "react-router-dom";

type LinkSwitcherProps = {
  to: string;
  text: string;
  onClick?: () => void;
};

const LinkSwitcher = ({ to, text, onClick }: LinkSwitcherProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-sm text-links_color capitalize font-normal"
    >
      {text}
    </Link>
  );
};

export default LinkSwitcher;
