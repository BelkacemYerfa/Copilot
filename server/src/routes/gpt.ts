import { isAuthunticated } from "../middlewares/isAuthunticated";
import { gptText } from "../controllers/gpt";
import { Router } from "express";

export default (router: Router) => {
  router.post("/generateText", isAuthunticated, gptText);
};
