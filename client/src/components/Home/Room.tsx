import { useAuthUser } from "../../hooks/useAuthUser";
import { ChatMessage } from "../shared/Input/ChatMessage";
import { ChatInput } from "../shared/Input/ChatInput";

const Room = () => {
  const { user } = useAuthUser();
  return (
    <section className="relative basis-full md:basis-[80%]  overflow-y-scroll ChatMessagesHolder scroll-smooth ">
      <div className="w-full pb-[5.5rem]">
        <ChatMessage userId={user.name} />
      </div>
      <div className="fixed bottom-0 p-5 w-[80%] flex justify-center">
        <ChatInput />
      </div>
    </section>
  );
};

export default Room;
