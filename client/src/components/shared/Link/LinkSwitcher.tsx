import { Link } from "react-router-dom";

type LinkSwitcherProps = {
  to: string;
  text: string;
};

const LinkSwitcher = ({ to, text }: LinkSwitcherProps) => {
  return (
    <Link to={to} className="text-sm text-links_color capitalize font-normal">
      {text}
    </Link>
  );
};

export default LinkSwitcher;
