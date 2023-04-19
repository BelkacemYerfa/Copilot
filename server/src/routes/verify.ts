import { VerfiyMail } from "../controllers/email";
import { Router } from "express";

export default (router: Router) => {
  router.post("/auth/verifyEmail", VerfiyMail);
};
