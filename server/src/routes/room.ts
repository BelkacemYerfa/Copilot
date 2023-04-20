import {
  createNewRoom,
  deleteRoom,
  fetchAllRooms,
  getRoomContent,
} from "../controllers/room";
import { Router } from "express";

export const getRoomRouter = (router: Router) => {
  router.get("/roomDetails/:roomId", getRoomContent);
};

export const createRoomRouter = (router: Router) => {
  router.post("/createRoom", createNewRoom);
};

export const DeleteRoomRouter = (router: Router) => {
  router.delete("/deleteRoom/:roomId", deleteRoom);
};

export const getAllRoomDetails = (router: Router) => {
  router.get("/getAllRooms", fetchAllRooms);
};
