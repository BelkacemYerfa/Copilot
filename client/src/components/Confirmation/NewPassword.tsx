import { Distination } from "../../interfaces&types&static/Distination";
import AcceptTerms from "../shared/Input/AcceptTerms";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import Text from "../shared/Text/Text";
import SignBtn from "../shared/btns/SignBtn";
import { motion } from "framer-motion";

const NewPassword = () => {
  const dist: Distination = {
    text: "Terms & Conditions",
    to: "/auth",
  };
  return (
    <motion.section
      initial={{ x: "60%" }}
      animate={{ x: 0 }}
      exit={{ x: "-60%" }}
      className="text-center space-y-7"
    >
      <div>
        <h2 className="text-2xl/9 text-main_color font-semibold">
          Setup New Password
        </h2>
        <div className="flex items-center gap-x-1">
          <Text text="Have you already reset the password?" />
          <LinkSwitcher to="/auth" text="Sign in" />
        </div>
      </div>
      <form action="" className="flex flex-col gap-y-5">
        <Input placeholderType="Password" RegisterInput={""} />
        <Input placeholderType="Repeat Password" RegisterInput={""} />
      </form>
      <AcceptTerms text="I Agree & " dist={dist} />
      <SignBtn text="Submit" disable={false} />
    </motion.section>
  );
};

export default NewPassword;
