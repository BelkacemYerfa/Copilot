import { ChatMessage } from "../shared/Input/ChatMessage";
import { ChatInput } from "../shared/Input/ChatInput";

const Room = () => {
  return (
    <section className="relative basis-full md:basis-[80%]  overflow-y-scroll ChatMessagesHolder scroll-smooth ">
      <div className="w-full pb-[5.5rem]">
        <ChatMessage />
      </div>
      <div className="fixed bottom-0 p-5 w-[80%] flex justify-center">
        <ChatInput />
      </div>
    </section>
  );
};

export default Room;
