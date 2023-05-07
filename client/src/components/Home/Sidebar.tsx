import { NewChatBtn } from "../shared/btns/NewChatBtn";
import Add from "../../assets/icons/add.svg";
import Account from "../../assets/icons/account.svg";
import Faq from "../../assets/icons/faq.svg";
import Light from "../../assets/icons/light.svg";
import Trash from "../../assets/icons/trash.svg";
import LogOut from "../../assets/icons/logout.svg";
import { RoomLink } from "../shared/Link/RoomLink";
import { Setting } from "../shared/btns/Setting";

const SideBar = () => {
  return (
    <section className="absolute bg-white w-[80%] sm:relative h-screen flex flex-col p-5 sm:basis-[20%] border-r border-solid border-btn_border_color space-y-2">
      <NewChatBtn text="New Chat" Icon={Add} />
      <ul className="flex gap-y-2 flex-col justify-start">
        <RoomLink to="/room" name="Ai Chat Tool Ethics" />
        <RoomLink to="/room" name="Ai Chat Tool Ethics" />
        <RoomLink to="/room" name="Ai Chat Tool Ethics" />
      </ul>
      <div className="absolute bottom-0 w-full left-0 bg-white p-5 flex flex-col gap-y-1 border-t border-solid border-btn_border_color ">
        <Setting text="Clear conversations" Icon={Trash} />
        <Setting text="Light mode" Icon={Light} />
        <Setting text="My  account" Icon={Account} />
        <Setting text="Updates & FAQ" Icon={Faq} />
        <Setting text="Log out" Icon={LogOut} />
      </div>
    </section>
  );
};

export default SideBar;
