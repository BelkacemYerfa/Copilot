import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RoomDetailsProps<T> {
  roomId: string;
  fetchRoomDetails: (roomId: string) => Promise<T>;
}

export const useRoomDetails = <T>({
  roomId,
  fetchRoomDetails,
}: RoomDetailsProps<T>) => {
  return useQuery<T>(["room-details", roomId], () => fetchRoomDetails(roomId));
};
