import DefaultHome from "../components/Home/DefaultHome";
import Room from "../components/Home/Room";
import SideBar from "../components/Home/Sidebar";
import { useAuthUser } from "../hooks/useAuthUser";
import { useParams } from "react-router-dom";

const Home = () => {
  const { user } = useAuthUser();
  console.log(user);
  const { id } = useParams();
  return (
    <section className="flex relative">
      <SideBar />
      {id ? <Room id={id} /> : <DefaultHome />}
    </section>
  );
};

export default Home;
