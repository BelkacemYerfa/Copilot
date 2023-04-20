import { Router } from "express";
import registration from "./registration";
import login from "./login";
import verify from "./verify";
import passwordUpdate from "./passwordUpdate";

const router = Router();

export default (): typeof router => {
  registration(router);
  login(router);
  verify(router);
  passwordUpdate(router);
  return router;
};
