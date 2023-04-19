import { Router } from "express";
import registration from "./registration";
import login from "./login";
import verify from "./verify";

const router = Router();

export default (): typeof router => {
  registration(router);
  login(router);
  verify(router);
  return router;
};
