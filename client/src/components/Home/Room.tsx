import { useAuthUser } from "../../hooks/useAuthUser";
import { ChatMessage } from "../shared/Input/ChatMessage";
import { ChatInput } from "../shared/Input/ChatInput";

interface RoomProps {
  id: string;
}

const Room = ({ id }: RoomProps) => {
  const { user } = useAuthUser();
  return (
    <section className="relative basis-full md:basis-[80%] flex flex-col ">
      <div className="flex-1">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>page id : {id}</p>
        <ChatMessage userId={user.name} />
      </div>
      <section className=" m-auto w-[90%] flex flex-col gap-y-3 ">
        <section className="sticky bottom-0 bg-white p-4 rounded-md">
          <ChatInput />
        </section>
      </section>
    </section>
  );
};

{
  /* <WritingAnimation
  textArray={[
    "Hello, world! \n",
    "Welcome to my website! \n",
    "Let's create something amazing! \n",
  ]}
/> */
}

export default Room;
