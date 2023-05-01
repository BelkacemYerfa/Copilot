import CryptoText from "../shared/Text/CryptedText";
import Text from "../shared/Text/Text";
import SignBtn from "../shared/btns/SignBtn";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import CodeHolder from "../shared/Input/CodeHolder";
import { motion } from "framer-motion";
import MobileSvg from "../shared/animatedSvgs/MobileSvg";
import { ChangeEvent, useState } from "react";

type VerifyProps = {
  text?: string;
  setCount: () => void;
};

const Verify = ({ text = "746535", setCount }: VerifyProps) => {
  const [newCode, setNewCode] = useState<string[]>([]);

  return (
    <motion.form
      onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newCode);
        const CheckNewCode = newCode.join("");
        console.log(CheckNewCode);
        if (CheckNewCode === text) {
          setCount();
        } else {
          /* console.log(CheckNewCode); */
        }
      }}
      initial={{ x: "60%" }}
      animate={{ x: 0 }}
      exit={{ x: "-60%" }}
      className="text-center space-y-7"
    >
      <MobileSvg />
      <div className="space-y-2">
        <h2>Two Step Verification</h2>
        <Text text="Enter the verification code we sent to" />
      </div>
      <CryptoText text={"*****5"} />
      <div className="space-y-2">
        <p className="text-sm text-main_color font-semibold">
          Type your 6 digit security code
        </p>
        <CodeHolder code={text.split("")} codeChange={setNewCode} />
      </div>

      <SignBtn text="Submit" disable={false} />
      <div className="flex justify-center gap-x-1">
        <Text text="Didn't get the code" />
        <LinkSwitcher to="/" text="Resend" />
      </div>
    </motion.form>
  );
};

export default Verify;
