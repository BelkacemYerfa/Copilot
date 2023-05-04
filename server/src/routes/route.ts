import { Router } from "express";
import { LogUser, LogoutUser, RegisterUser } from "./auth";
import verify from "./verify";
import passwordUpdate from "./passwordUpdate";
import { generateGptResponse } from "./gpt";
import {
  DeleteRoomRouter,
  createRoomRouter,
  getAllRoomDetails,
  getRoomRouter,
} from "./room";

const router = Router();

export default (): typeof router => {
  RegisterUser(router);
  LogUser(router);
  LogoutUser(router);
  verify(router);
  passwordUpdate(router);
  generateGptResponse(router);
  getRoomRouter(router);
  DeleteRoomRouter(router);
  getAllRoomDetails(router);
  createRoomRouter(router);
  return router;
};
