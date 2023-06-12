import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import {
  createJwtAuth,
  createUser,
  getUserByMail,
  updateUser,
  getUserById,
} from "../models/User";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

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
        maxAge: 60 * 60 * 24 * 7 * 10,
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
    return res.status(200).json({
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
        maxAge: 60 * 60 * 24 * 7 * 365,
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
    console.log(check_User.password);
    const salt = await bcrypt.genSalt(12);
    const hash_Password = await bcrypt.hash(password, salt);
    check_User.password = hash_Password;
    check_User.save();
    const currentUser = {
      email: check_User.email,
      name: check_User.name,
      profilePic: check_User.profilePicture,
    };
    res.cookie(
      "copilote_auth ",
      await createJwtAuth(check_User._id.toString()),
      {
        domain: "localhost",
        path: "/",
      }
    );
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

export const LogVerification = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.copilote_auth;
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
    const userId = jsonwebtoken.decode(token) as JwtPayload;
    let userInfo: string[] = [];
    for (let key in userId) {
      if (typeof userId[key] === "string") {
        userInfo.push(userId[key]);
      }
    }
    const findUser = await getUserById(userInfo[0]);
    if (!findUser) {
      return res.status(404).json({
        msg: "their is no user associated with this info",
      });
    }
    const currentUser = {
      name: findUser.name,
      email: findUser.email,
      profilePicture: findUser.profilePicture,
    };
    res.status(200).json({
      success: true,
      user: currentUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
