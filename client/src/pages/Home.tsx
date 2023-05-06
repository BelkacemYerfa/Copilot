import { useAuthUser } from "../hooks/useAuthUser";

const Home = () => {
  const { user } = useAuthUser();
  console.log(user);
  return (
    <section>
      {user.name ? (
        <>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </>
      ) : (
        <h1>Not logged in</h1>
      )}
    </section>
  );
};

export default Home;
