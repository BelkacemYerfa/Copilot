import SideBar from "../components/Home/Sidebar";
import { useAuthUser } from "../hooks/useAuthUser";

const Home = () => {
  const { user } = useAuthUser();
  console.log(user);
  return (
    <section className="flex ">
      <SideBar />
      <section className="basis-[80%]">
        {user.name ? (
          <>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </>
        ) : (
          <h1>Not logged in</h1>
        )}
      </section>
    </section>
  );
};

export default Home;
