import { useAuthUser } from "../../hooks/useAuthUser";
import { ChatMessage } from "../shared/Input/ChatMessage";
import { ChatInput } from "../shared/Input/ChatInput";
import { useChat } from "../../hooks/useChat";

interface RoomProps {
  id: string;
}

const Room = ({ id }: RoomProps) => {
  const { user } = useAuthUser();
  const { Rooms } = useChat();
  const Room = Rooms.find((room) => room.id === id);
  return (
    <section className="relative basis-full md:basis-[80%]  overflow-y-scroll ChatMessagesHolder scroll-smooth ">
      <div className="w-full pb-[5.5rem]">
        <ChatMessage
          userId={user.name}
          messages={Room?.messages ? Room?.messages : []}
        />
      </div>
      <div className="fixed bottom-0 w-[80%] flex justify-center">
        <ChatInput id={id} />
      </div>
    </section>
  );
};

export default Room;
