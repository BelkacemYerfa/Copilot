import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import {
  createJwtAuth,
  createUser,
  getUserByMail,
  updateUser,
} from "../models/User";

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "provide the fields",
      });
    }
    const ExistingUser = await getUserByMail(email);
    if (ExistingUser) {
      return res.status(400).json({
        msg: "an account is already associated with thi email",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hash_Password = await bcrypt.hash(password, salt);
    const newUser = {
      name: email.split("@")[0],
      email: email,
      password: hash_Password,
    };
    const RegisterUser = await createUser(newUser);
    const currentUser = {
      name: RegisterUser.name,
      email: email,
    };
    res.cookie(
      "copilote_auth ",
      await createJwtAuth(RegisterUser._id.toString()),
      {
        domain: "localhost",
        path: "/",
      }
    );
    return res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("copilote_auth", { path: "/" });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "provide the fields",
      });
    }
    const check_User = await getUserByMail(email);
    if (!check_User) {
      return res.status(404).json({
        msg: "their is not account associated with this email",
      });
    }
    const isMatch = await bcrypt.compare(password, check_User.password);
    if (!isMatch) {
      return res.status(401).json({
        msg: "your are not authorized , check your credentials",
      });
    }
    res.cookie(
      "copilote_auth ",
      await createJwtAuth(check_User._id.toString()),
      {
        domain: "localhost",
        path: "/",
      }
    );
    const currentUser = {
      email: check_User.email,
      name: check_User.name,
      profilePic: check_User.profilePicture,
    };
    return res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CreateNewPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "provide the fields",
      });
    }
    const check_User = await getUserByMail(email);
    if (!check_User) {
      return res.status(404).json({
        msg: "their no account associated with this email",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hash_Password = await bcrypt.hash(password, salt);
    await updateUser(email, check_User._id.toString(), {
      name: check_User.name,
      email: email,
      password: hash_Password,
    });
    const new_user = await getUserByMail(email);
    const currentUser = {
      email: new_user.email,
      name: new_user.name,
      profilePic: new_user.profilePicture,
    };
    res.cookie("copilote_auth ", await createJwtAuth(new_user._id.toString()), {
      domain: "localhost",
      path: "/",
    });
    return res.status(201).json({
      success: true,
      msg: "user password updated successfully",
      user: currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
