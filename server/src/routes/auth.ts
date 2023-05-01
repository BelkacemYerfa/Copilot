import { Login, Logout, Register } from "../controllers/auth";
import { Router } from "express";

export const LogUser = (router: Router) => {
  router.post("/auth/login", Login);
};

export const LogoutUser = (router: Router) => {
  router.get("/auth/logout", Logout);
};

export const RegisterUser = (router: Router) => {
  router.post("/auth/register", Register);
};
