import Room from "../components/Home/Room";
import SideBar from "../components/Home/Sidebar";

interface Id {
  id: string;
}

const Home = () => {
  return (
    <section className="flex relative">
      <SideBar />
      <Room />
    </section>
  );
};

export default Home;
