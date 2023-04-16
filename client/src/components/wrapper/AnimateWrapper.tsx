import { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";

interface WrapperProps {
  children: ReactNode;
  direction: string;
}

const AnimateWrapper = ({ children, direction }: WrapperProps) => {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      {children}
    </AnimatePresence>
  );
};

export default AnimateWrapper;
