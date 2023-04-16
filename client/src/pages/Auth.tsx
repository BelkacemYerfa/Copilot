import { lazy, useEffect, useRef, useState } from "react";
import { SignIn } from "../components/Auth/SignIn";
import NewPassword from "../components/Confirmation/NewPassword";
import Verify from "../components/Confirmation/Verify";
import { AnimatePresence, motion } from "framer-motion";
import Wrapper from "../components/wrapper/AnimateWrapper";
const SignUp = lazy(() => import("../components/Auth/SignUp"));

export const Auth = (): JSX.Element => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [tuple, setTuple] = useState<[number | null, number]>([null, count]);
  let direction: string = "right";
  useEffect(() => {
    if (tuple[1] !== count) setTuple([tuple[1], count]);
    direction = count < tuple[1] ? "left" : "right";
  }, [count]);
  const SignInELements: JSX.Element[] = [
    <SignIn
      isVisable={() => setIsSignIn(!isSignIn)}
      onChange={() => setCount((prev) => prev + 1)}
      direction={direction}
    />,
    <Verify direction={direction} />,
    <NewPassword direction={direction} />,
  ];
  const SignUpElements = [
    <SignUp isVisable={() => setIsSignIn(!isSignIn)} direction={direction} />,
    <Verify direction={direction} />,
  ];
  return (
    <motion.section className="duration ease-in-out h-screen flex items-center justify-center bg-white md:bg-auth_bg_main_color ">
      <div className="w-[90%] sm:w-[50%] min-h-full sm:min-h-[80%] bg-white flex items-center justify-center flex-col rounded-2xl p-0 md:p-5 overflow-hidden ">
        {isSignIn ? (
          <Wrapper direction={direction}>{SignInELements[count - 1]}</Wrapper>
        ) : (
          <Wrapper direction={direction}>{SignUpElements[count - 1]}</Wrapper>
        )}
      </div>
    </motion.section>
  );
};
