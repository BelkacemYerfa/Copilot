import { Router } from "express";
import { LogUser, LogoutUser, RegisterUser, checkAuth } from "./auth";
import verify from "./verify";
import passwordUpdate from "./passwordUpdate";
import { generateGptResponse } from "./gpt";
import { updateUserProfileInfo } from "./user";

const router = Router();

export default (): typeof router => {
  RegisterUser(router);
  LogUser(router);
  LogoutUser(router);
  checkAuth(router);
  verify(router);
  passwordUpdate(router);
  generateGptResponse(router);
  updateUserProfileInfo(router);
  return router;
};
