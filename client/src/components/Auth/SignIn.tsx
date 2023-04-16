import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import { SignProps } from "../../interfaces&types/Distination";
import { motion } from "framer-motion";

interface SignInProps extends SignProps {
  onChange: () => void;
  direction: string;
}

export const SignIn = ({ isVisable, onChange, direction }: SignInProps) => {
  return (
    <motion.section
      initial={{ x: direction === "right" ? "60%" : "-60%" }}
      animate={{ x: 0 }}
      exit={{ x: direction === "right" ? "-150%" : "150%" }}
      className="text-center space-y-7 "
    >
      <div className="space-y-2">
        <h2 className="text-2xl/9 text-main_color font-semibold">Sing In</h2>
        <Text text="Copilot" />
      </div>
      <form
        action=""
        className="flex flex-col sm:flex-row gap-y-2   items-center gap-x-4"
      >
        <MainBtn text="Sign in with Google" Icon={google} />
        <MainBtn text="Sign in with Apple" Icon={apple} />
      </form>
      <Swicher />
      <form action="" className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-4">
          <Input placeholderType="Email" />
          <Input placeholderType="Password" />
        </div>
        <div className="flex justify-end w-full">
          <LinkSwitcher
            to="/auth"
            text="forgot password?"
            onChange={onChange}
          />
        </div>
      </form>
      <SignBtn text="Sign In" />
      <div className="flex justify-center gap-x-1">
        <Text text="Not a Member yet?" />
        <LinkSwitcher to="/auth" text="Sign Up" onClick={isVisable} />
      </div>
    </motion.section>
  );
};
