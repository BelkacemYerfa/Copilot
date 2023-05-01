import { Router } from "express";
import { LogUser, LogoutUser, RegisterUser } from "./login";
import verify from "./verify";
import passwordUpdate from "./passwordUpdate";
import gpt from "./gpt";
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
  gpt(router);
  getRoomRouter(router);
  DeleteRoomRouter(router);
  getAllRoomDetails(router);
  createRoomRouter(router);
  return router;
};
