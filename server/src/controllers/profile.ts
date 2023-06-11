import { Request, Response } from "express";
import { creaptePassword, getIdFromJWT, getUserById } from "../models/User";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = await getIdFromJWT(req);
    const { name, email, password, profilePicture } = req.body;
    const user = await getUserById(userId._id.toString());
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = (await creaptePassword(password)) || user.password;
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();
    return res.status(200).json({
      msg: "User updated successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
