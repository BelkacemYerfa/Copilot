import { isAuthenticated } from "../middlewares/isAuthunticated";
import { gptText } from "../controllers/gpt";
import { Router } from "express";

export const generateGptResponse = (router: Router) => {
  router.post("/generateText", isAuthenticated, gptText);
};
