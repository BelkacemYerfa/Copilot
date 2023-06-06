import { Link } from "react-router-dom";
import Chat from "../../../assets/icons/chat.svg";

interface RoomLinkProps {
  to: string;
  name: string;
  resize: boolean;
  highlight: boolean;
}

export const RoomLink = ({ to, name, resize, highlight }: RoomLinkProps) => {
  return (
    <Link
      to={to}
      onClick={() => {
        console.log(to.split("/")[2]);
      }}
      className={`flex items-center px-4 py-3 gap-x-[14.25px] text-sm font-normal text-main_color duration-300 ease-in-out rounded-lg hover:bg-auth_bg_main_color ${
        resize ? "justify-center" : "justify-start"
      } ${highlight ? "bg-auth_bg_main_color" : "bg-transparent"} `}
    >
      <div>
        <img src={Chat} alt="chat" />
      </div>
      {!resize ? <p className="truncate">{name}</p> : null}
    </Link>
  );
};
