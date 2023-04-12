import { Register } from "../controllers/auth";
import { Router } from "express";

export default (router: Router) => {
  router.post("/auth/register", Register);
};
