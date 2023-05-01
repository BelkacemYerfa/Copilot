import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { getUserBySessionToken } from "../models/User";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.copilote_auth;
    if (!token) {
      return res.status(401).json({
        msg: "forbidden access",
      });
    }
    const existing_User = await getUserBySessionToken(token);
    //check the code bellow
    if (!existing_User) {
      return res.status(403).json({
        msg: "you are not authorized , please login",
      });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        msg: "you are not authorized, please login",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};
