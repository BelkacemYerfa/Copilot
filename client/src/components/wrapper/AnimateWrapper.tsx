import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

interface WrapperProps {
  children: ReactNode;
}

const AnimateWrapper = ({ children }: WrapperProps) => {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
};

export default AnimateWrapper;
