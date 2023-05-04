import { isAuthenticated } from "../middlewares/isAuthunticated";
import {
  createNewRoom,
  deleteRoom,
  fetchAllRooms,
  getRoomContent,
} from "../controllers/room";
import { Router } from "express";

export const getRoomRouter = (router: Router) => {
  router.get("/roomDetails/:roomId", isAuthenticated, getRoomContent);
};

export const createRoomRouter = (router: Router) => {
  router.post("/createRoom", isAuthenticated, createNewRoom);
};

export const DeleteRoomRouter = (router: Router) => {
  router.delete("/deleteRoom/:roomId", isAuthenticated, deleteRoom);
};

export const getAllRoomDetails = (router: Router) => {
  router.get("/getAllRooms", isAuthenticated, fetchAllRooms);
};
