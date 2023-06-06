import { IChat } from "../@types/chat";
import { RoomsInfoContext } from "../context/ChatContext";
import { useContext } from "react";

type useChatType = {
  Rooms: IChat[];
  setRoomInfo: (Room: IChat) => void;
  createRoom: (Room: IChat) => void;
  setRoomMessages: (Room: IChat) => void;
};

export const useChat = (): useChatType => {
  const {
    state: { Rooms },
    setRoomInfo,
    createRoom,
    setRoomMessages,
  } = useContext(RoomsInfoContext);
  return { Rooms, setRoomInfo, createRoom, setRoomMessages };
};
