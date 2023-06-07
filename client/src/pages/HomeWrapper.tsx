import { useParams } from "react-router-dom";
import { RoomsInfoProvider, initialState } from "../context/ChatContext";
import Home from "./Home";

export const HomeWrapper = () => {
  const { id } = useParams();
  const Id = id as string;
  return (
    <RoomsInfoProvider Rooms={initialState.Rooms}>
      <Home id={Id} />
    </RoomsInfoProvider>
  );
};
