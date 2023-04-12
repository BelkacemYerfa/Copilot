import { Router } from "express";
import registration from "./registration";
import login from "./login";

const router = Router();

export default (): typeof router => {
  registration(router);
  login(router);
  return router;
};
