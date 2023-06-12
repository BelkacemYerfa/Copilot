import { Request, Response } from "express";
import { creaptePassword, getIdFromJWT, getUserById } from "../models/User";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = await getIdFromJWT(req);
    const { name, email, password, profilePicture } = req.body;
    const user = await getUserById(userId._id.toString());
    //console.log(req.body);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const salt = await creaptePassword(password);
      user.password = salt;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }
    await user.save();
    res.status(200).json({
      msg: "User updated successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: "there is an error",
    });
  }
};
