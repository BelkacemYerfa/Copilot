import { NextFunction, Request, Response } from "express";
import { getUserById, getUserByMail } from "../models/User";
import jsonwebtoken from "jsonwebtoken";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.copilote_auth;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        msg: "forbidden access",
      });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        msg: "you are not authorized, please login",
      });
    }
    const userId = jsonwebtoken.decode(token);
    const findUser = await getUserById(userId.toString());
    if (!findUser) {
      return res.status(404).json({
        msg: "their is no user associated with this info",
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
