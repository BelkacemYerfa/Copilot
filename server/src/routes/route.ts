import { Router } from "express";
import registration from "./registration";
import login from "./login";
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
  registration(router);
  login(router);
  verify(router);
  passwordUpdate(router);
  gpt(router);
  getRoomRouter(router);
  DeleteRoomRouter(router);
  getAllRoomDetails(router);
  createRoomRouter(router);
  return router;
};
