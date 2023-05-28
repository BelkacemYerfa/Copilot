import useAxios from "../../../hooks/useAxios";
import axios from "axios";
import { BASE_URL } from "../../../interfaces&types&static/Infos";
import { useNavigate } from "react-router-dom";

interface RoomLinkProps {
  text: string;
  Icon: string;
  fetchFunc: () => void;
  resize: boolean;
}

export const SettingBtnReq = ({
  text,
  Icon,
  fetchFunc,
  resize,
}: RoomLinkProps) => {
  return (
    <button
      onClick={fetchFunc}
      className={`flex items-center px-4 py-3 gap-x-[14.25px] text-sm font-normal text-main_color duration-300 ease-in-out rounded-lg hover:bg-auth_bg_main_color ${
        resize ? "justify-center" : "justify-start"
      }`}
    >
      <div>
        <img src={Icon} alt={text} />
      </div>
      {!resize ? <p className="truncate">{text}</p> : null}
    </button>
  );
};
