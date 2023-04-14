import { lazy, useState } from "react";
import { SignIn } from "../components/Auth/SignIn";
import NewPassword from "../components/Confirmation/NewPassword";
import Verify from "../components/Confirmation/Verify";
const SignUp = lazy(() => import("../components/Auth/SignUp"));

export const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  return (
    <section className="duration ease-in-out h-screen flex items-center justify-center bg-white md:bg-auth_bg_main_color ">
      <div className="w-[90%] sm:w-[45%] min-h-full sm:min-h-[80%] bg-white flex items-center justify-center flex-col rounded-2xl p-0 md:p-5 ">
        {isSignIn ? <NewPassword /> : <Verify />}
      </div>
    </section>
  );
};
