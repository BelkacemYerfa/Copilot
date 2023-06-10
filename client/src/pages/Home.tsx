import { useState } from "react";
import DefaultHome from "../components/Home/DefaultHome";
import Room from "../components/Home/Room";
import SideBar from "../components/Home/Sidebar";
import { useChat } from "../hooks/useChat";

interface Id {
  id: string;
}

const Home = ({ id }: Id) => {
  const [Id, setId] = useState<string>("");
  const { Rooms } = useChat();
  const WantedRoom = Rooms.find((room) => room.id === id);

  return (
    <section className="flex relative">
      <SideBar highlight={id === Id} setId={setId} />
      {WantedRoom?.messages ? <Room id={id} /> : <DefaultHome />}
    </section>
  );
};

export default Home;
