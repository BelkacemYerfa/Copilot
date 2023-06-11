import { updateProfile } from "controllers/profile";
import { isAuthenticated } from "../middlewares/isAuthunticated";
import { Router } from "express";

export const updateUserProfileInfo = (router: Router) => {
  router.patch("/updateProfile", isAuthenticated, updateProfile);
};
