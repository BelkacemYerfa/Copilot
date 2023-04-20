import { CreateNewPassword } from "../controllers/auth";
import { Router } from "express";

export default (router: Router) => {
  router.patch("/auth/newPassword", CreateNewPassword);
};
