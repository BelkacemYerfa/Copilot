import { NewChatBtn } from "../shared/btns/NewChatBtn";
import Add from "../../assets/icons/add.svg";
import Account from "../../assets/icons/account.svg";
import Faq from "../../assets/icons/faq.svg";
import Light from "../../assets/icons/light.svg";
import Trash from "../../assets/icons/trash.svg";
import LogOut from "../../assets/icons/logout.svg";
import { RoomLink } from "../shared/Link/RoomLink";
import { Setting } from "../shared/btns/Setting";
import { SettingBtnReq } from "../shared/btns/SettingBtnReq";
import axios from "axios";
import { BASE_URL } from "../../interfaces&types&static/Infos";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";

const SideBar = () => {
  const navigate = useNavigate();
  const { set } = useAuthUser();
  //you can react-query to make the request using the refetch func and making an option that says it's manual
  const logOutFunc = async () => {
    const { data } = await axios.get(`${BASE_URL}auth/logout`, {
      withCredentials: true,
    });
    if (data) {
      set({
        name: "",
        email: "",
      });
      navigate("/auth");
    }
  };
  return (
    <section className="fixed  z-10 sm:sticky top-0 left-0 bg-white w-[80%] h-screen flex flex-col sm:w-[20%] border-r border-solid border-btn_border_color space-y-2">
      <div className="flex-1 ">
        <div className="p-5">
          <NewChatBtn text="New Chat" Icon={Add} />
        </div>
        <ol className="channelsList pl-5 space-y-1 w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-btn_border_color ">
          <RoomLink to="/room/1" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
        </ol>
        <div className="absolute bottom-0 w-full left-0 bg-white px-5  sm:p-5 flex flex-col gap-y-1 border-t border-solid border-btn_border_color ">
          <SettingBtnReq
            text="Clear conversations"
            Icon={Trash}
            fetchFunc={() => {}}
          />
          <Setting text="Light mode" Icon={Light} />
          <Setting text="My  account" Icon={Account} />
          <Setting text="Updates & FAQ" Icon={Faq} />
          <SettingBtnReq text="Log out" Icon={LogOut} fetchFunc={logOutFunc} />
        </div>
      </div>
    </section>
  );
};

export default SideBar;
