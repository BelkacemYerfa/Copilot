import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RoomDetailsProps<T> {
  roomId: string;
  fetchRoomDetails: (roomId: string) => Promise<T>;
}

const createRoom = () => {
  return axios.post(
    "http://localhost:8000/api/v1/createRoom",
    {},
    {
      withCredentials: true,
    }
  );
};

export const useRoomDetails = <T>({
  roomId,
  fetchRoomDetails,
}: RoomDetailsProps<T>) => {
  return useQuery<T>(["room-details", roomId], () => fetchRoomDetails(roomId));
};

export const useCreateNewRoom = () => {
  return useMutation(createRoom);
};
