import Account from "../../assets/icons/account.svg";
import Faq from "../../assets/icons/faq.svg";
import Light from "../../assets/icons/light.svg";
import Trash from "../../assets/icons/trash.svg";
import LogOut from "../../assets/icons/logout.svg";
import { Setting } from "../shared/btns/Setting";
import { SettingBtnReq } from "../shared/btns/SettingBtnReq";
import axios from "axios";
import { BASE_URL } from "../../interfaces&types&static/Infos";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../../hooks/useAuthUser";
import { useEffect, useState } from "react";
import Profile from "../userProfile/Profile";

const SideBar = () => {
  const navigate = useNavigate();
  const [resize, setResize] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 640 && window.innerWidth < 760) {
        setResize(true);
      } else setResize(false);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setResize(false);
      });
  });
  return (
    <section className="fixed z-10 sm:sticky top-0 left-0 bg-white w-[80%] h-screen flex flex-col sm:w-[20%] border-r border-solid border-btn_border_color space-y-2">
      <div
        className="absolute bottom-0 w-full left-0 bg-white px-5 
        py-3 sm:p-5 flex flex-col gap-y-1 border-t border-solid border-btn_border_color "
      >
        <Setting text="Light mode" Icon={Light} resize={resize} />
        <Setting
          text="My account"
          Icon={Account}
          resize={resize}
          onClick={() => {
            setOpen(true);
          }}
        />
        <SettingBtnReq
          text="Log out"
          Icon={LogOut}
          fetchFunc={logOutFunc}
          resize={resize}
        />
      </div>
      {open ? (
        <div className="w-full h-screen">
          <Profile setOpen={() => setOpen(false)} />
        </div>
      ) : null}
    </section>
  );
};

export default SideBar;
