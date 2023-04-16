import { lazy, useRef, useState } from "react";
import { SignIn } from "../components/Auth/SignIn";
import NewPassword from "../components/Confirmation/NewPassword";
import Verify from "../components/Confirmation/Verify";
import { AnimatePresence, motion } from "framer-motion";
import Wrapper from "../components/wrapper/AnimateWrapper";
const SignUp = lazy(() => import("../components/Auth/SignUp"));

export const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  console.log(isSignIn);
  const displayElm: JSX.Element[] = [
    <SignIn isVisable={() => setIsSignIn(!isSignIn)} />,
    <Verify />,
    <NewPassword />,
  ];

  return (
    <motion.section className="duration ease-in-out h-screen flex items-center justify-center bg-white md:bg-auth_bg_main_color ">
      <div className="w-[90%] sm:w-[50%] min-h-full sm:min-h-[80%] bg-white flex items-center justify-center flex-col rounded-2xl p-0 md:p-5 overflow-hidden ">
        {isSignIn ? (
          <Wrapper>
            {" "}
            <SignIn isVisable={() => setIsSignIn(!isSignIn)} />,{" "}
          </Wrapper>
        ) : (
          <SignUp isVisable={() => setIsSignIn(!isSignIn)} />
        )}
      </div>
    </motion.section>
  );
};
