import MainBtn from "../shared/btns/MainBtn";
import google from "../../assets/icons/google.svg";
import apple from "../../assets/icons/apple.svg";
import Text from "../shared/Text/Text";
import Swicher from "../shared/Switcher/Switcher";
import Input from "../shared/Input/Input";
import LinkSwitcher from "../shared/Link/LinkSwitcher";
import SignBtn from "../shared/btns/SignBtn";

export const SignIn = () => {
  return (
    <section className="text-center space-y-7 ">
      <div className="space-y-2">
        <h2 className="text-2xl/9 text-main_color font-semibold">Sing In</h2>
        <Text text="Copilot" />
      </div>
      <form action="" className="flex items-center gap-x-4">
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
          <LinkSwitcher to="/auth" text="forgot password?" />
        </div>
      </form>
      <SignBtn text="Sign In" />
      <div className="flex justify-center gap-x-1">
        <Text text="Not a Member yet?" />
        <LinkSwitcher to="/auth" text="Sign Up" />
      </div>
    </section>
  );
};
