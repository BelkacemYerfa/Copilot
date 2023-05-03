import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { createUser, getUser, updateUser } from "../models/User";
import { CustomError } from "errors/CustomError";

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError("please provide values to all the fields", 400);
    }
    const ExistingUser = await getUser(email);
    if (ExistingUser) {
      throw new CustomError("the user already exists", 400);
    }
    const salt = await bcrypt.genSalt(12);
    const hash_Password = await bcrypt.hash(password, salt);
    const JWT = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const newUser = {
      name: email.split("@")[0],
      email: email,
      password: hash_Password,
      sessionToken: JWT,
    };
    const RegisterUser = await createUser(newUser);
    const currentUser = {
      name: RegisterUser.name,
      email: email,
      sessoionToken: RegisterUser.sessionToken,
    };
    res.cookie("copilote_auth ", RegisterUser.sessionToken, {
      domain: "localhost",
      path: "/",
    });
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
      throw new CustomError("please provide values to all the fields", 400);
    }
    const check_User = await getUser(email);
    if (!check_User) {
      throw new CustomError("sorry , user is not found", 404);
    }
    const isMatch = await bcrypt.compare(password, check_User.password);
    if (!isMatch) {
      throw new CustomError(
        "you're not authorized , check your credentials",
        401
      );
    }
    const JWT = jsonwebtoken.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    check_User.sessionToken = JWT;
    res.cookie("copilote_auth ", check_User.sessionToken, {
      domain: "localhost",
      path: "/",
    });
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
      throw new CustomError("please provide all the fields", 400);
    }
    const check_User = await getUser(email);
    if (!check_User) {
      throw new CustomError("user is not found , check your credentials", 401);
    }
    const salt = await bcrypt.genSalt(12);
    const hash_Password = await bcrypt.hash(password, salt);
    await updateUser(email, check_User._id.toString(), {
      name: check_User.name,
      email: email,
      password: hash_Password,
      sessionToken: check_User.sessionToken,
    });
    const new_user = await getUser(email);
    const currentUser = {
      email: new_user.email,
      name: new_user.name,
      profilePic: new_user.profilePicture,
    };
    res.status(201).json({
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
