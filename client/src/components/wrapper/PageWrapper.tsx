import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: ReactNode;
  checked?: boolean;
}

const PageWrapper = ({ children, checked = false }: PageWrapperProps) => {
  return (
    <motion.section className="duration ease-in-out h-screen flex items-center justify-center bg-white md:bg-auth_bg_main_color ">
      {checked ? (
        <div className="w-[90%] sm:w-[50%] min-h-full sm:min-h-[80%] bg-white flex items-center justify-center flex-col rounded-2xl p-0 md:p-5 overflow-hidden ">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
};

export default PageWrapper;
