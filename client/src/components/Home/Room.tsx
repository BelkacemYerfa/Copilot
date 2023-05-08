import { useAuthUser } from "../../hooks/useAuthUser";

interface RoomProps {
  id: string;
}

const Room = ({ id }: RoomProps) => {
  const { user } = useAuthUser();
  return (
    <section>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>page id : {id}</p>
    </section>
  );
};

export default Room;
