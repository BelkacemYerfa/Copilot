import { motion } from "framer-motion";

interface NewChatBtnProps {
  text: string;
  Icon?: string;
}

export const NewChatBtn = ({ text, Icon }: NewChatBtnProps) => {
  return (
    <motion.button
      initial={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      type="submit"
      className="relative flex  gap-x-3 items-center justify-center bg-main_color p-main_input_padding w-full text-[18px]/7 text-white font-semibold rounded-lg"
    >
      <div>{Icon && <img src={Icon} className="h-4 w-4" alt={text} />}</div>
      {text}
    </motion.button>
  );
};
