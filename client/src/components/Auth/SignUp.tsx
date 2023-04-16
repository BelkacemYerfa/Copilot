import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";
import AcceptTerms from "../shared/Input/AcceptTerms";
import { Distination, SignProps } from "../../interfaces&types/Distination";
import { motion } from "framer-motion";

interface SignUpProps extends SignProps {
  direction: string;
}

const SignUp = ({ isVisable, direction }: SignUpProps) => {
  const dist: Distination = {
    text: "Terms",
    to: "/auth",
  };
  return (
    <motion.section
      initial={{ x: direction === "right" ? "60%" : "-60%" }}
      animate={{ x: 0 }}
      exit={{ x: direction === "right" ? "-150%" : "150%" }}
      className="text-center space-y-7 "
    >
      <div className="space-y-2">
        <h2 className="text-2xl/9 text-main_color font-semibold">Sing Up</h2>
        <Text text="Copilot" />
      </div>
      <form
        action=""
        className="flex flex-col sm:flex-row gap-y-2 items-center gap-x-4"
      >
        <MainBtn text="Sign in with Google" Icon={google} />
        <MainBtn text="Sign in with Apple" Icon={apple} />
      </form>
      <Swicher />
      <form action="" className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-4">
          <Input placeholderType="Email" />
          <Input placeholderType="Password" checkLenght={true} />
          <Input placeholderType="Repeat Password" placeholderCase="password" />
        </div>
        <div className="flex justify-start w-full">
          <AcceptTerms text="I Accept the " dist={dist} />
        </div>
      </form>
      <SignBtn text="Sign Up" />
      <div className="flex justify-center gap-x-1">
        <Text text="Already have an Account?" />
        <LinkSwitcher to="/auth" text="Sign Up" onClick={isVisable} />
      </div>
    </motion.section>
  );
};

export default SignUp;
