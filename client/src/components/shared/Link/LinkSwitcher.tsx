import { Link } from "react-router-dom";

type LinkSwitcherProps = {
  to: string;
  text: string;
  onClick?: () => void;
  onChange?: () => void;
};

const LinkSwitcher = ({ to, text, onClick, onChange }: LinkSwitcherProps) => {
  const handleClick = () => {
    if (onChange) {
      return onChange;
    }
    if (onClick) {
      return onClick;
    }
  };
  return (
    <Link
      to={to}
      onClick={handleClick}
      className="text-sm text-links_color capitalize font-normal"
    >
      {text}
    </Link>
  );
};

export default LinkSwitcher;
