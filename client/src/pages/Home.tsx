import DefaultHome from "../components/Home/DefaultHome";
import Room from "../components/Home/Room";
import SideBar from "../components/Home/Sidebar";
import { RoomsInfoProvider, initialState } from "../context/ChatContext";
import { useAuthUser } from "../hooks/useAuthUser";
import { useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  return (
    <section className="flex relative">
      <RoomsInfoProvider Rooms={initialState.Rooms}>
        <SideBar />
        {id ? <Room id={id} /> : <DefaultHome />}
      </RoomsInfoProvider>
    </section>
  );
};

export default Home;
