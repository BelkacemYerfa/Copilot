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

const SideBar = () => {
  return (
    <section className="fixed sm:sticky top-0 left-0 bg-white w-[80%] h-screen flex flex-col sm:w-[20%] border-r border-solid border-btn_border_color space-y-2">
      <div className="flex-1 ">
        <div className="p-5">
          <NewChatBtn text="New Chat" Icon={Add} />
        </div>
        <ol className="pl-5 space-y-1 max-h-[50%] w-full overflow-y-scroll scrollbar-thin scrollbar-thumb-btn_border_color ">
          <RoomLink to="/room/1" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
          <RoomLink to="/room/2" name="Ai Chat Tool Ethics" />
        </ol>
        <div className="absolute bottom-0 w-full left-0 bg-white p-5 flex flex-col gap-y-1 border-t border-solid border-btn_border_color ">
          <SettingBtnReq text="Clear conversations" Icon={Trash} endPoint="" />
          <Setting text="Light mode" Icon={Light} />
          <Setting text="My  account" Icon={Account} />
          <Setting text="Updates & FAQ" Icon={Faq} />
          <SettingBtnReq text="Log out" Icon={LogOut} endPoint="auth/logout" />
        </div>
      </div>
    </section>
  );
};

export default SideBar;
