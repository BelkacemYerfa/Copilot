import { motion } from "framer-motion";
import { useChat } from "../../../hooks/useChat";
import { useCreateNewRoom } from "../../../hooks/useRoomDetails";
import { ColorRing } from "react-loader-spinner";

interface NewChatBtnProps {
  text: string;
  Icon?: string;
  resize: boolean;
}

export const NewChatBtn = ({ text, Icon, resize }: NewChatBtnProps) => {
  const { createRoom, Rooms } = useChat();
  const { mutate: createNewRoom, isLoading } = useCreateNewRoom();

  return (
    <motion.button
      initial={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      type="submit"
      className={`relative flex  gap-x-3 items-center justify-center bg-main_color p-main_input_padding w-full text-[18px]/7 text-white font-semibold rounded-lg ${
        resize ? "p-3" : "p-0"
      }`}
      onClick={() => {
        createNewRoom();
        console.log(Rooms);
      }}
    >
      {isLoading ? (
        <ColorRing />
      ) : (
        <>
          <div>{Icon && <img src={Icon} alt={text} />}</div>
          {!resize ? <p className="truncate">{text}</p> : null}
        </>
      )}
    </motion.button>
  );
};
