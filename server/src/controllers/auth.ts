import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { createUser, getUser, updateUser } from "../models/User";

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please provide your credentails" });
    }
    const ExistingUser = await getUser(email);
    if (ExistingUser) {
      return res.status(400).json({
        msg: "this already an existing account with this mail",
      });
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
    const curentUser = {
      name: RegisterUser.name,
      email: email,
    };
    res.cookie("copilote_auth ", RegisterUser.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res.status(200).json({
      sucsses: true,
      user: curentUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "please provide your credentails",
      });
    }
    const check_User = await getUser(email);
    if (!check_User) {
      return res.status(404).json({
        msg: "sorry , user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, check_User.password);
    if (!isMatch) {
      return res.status(401).json({
        sucsses: false,
        msg: "password is incorect , please check your credentials",
      });
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
      sucsses: true,
      user: currentUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CreateNewPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || password) {
      return res.status(400).json({
        msg: "please provide your credentails",
      });
    }
    const check_User = await getUser(email);
    if (!check_User) {
      return res.status(404).json({
        msg: "user not found , please check your credentails",
      });
    }
    await updateUser(email, check_User._id.toString(), password);
    const new_user = await getUser(email);
    res.status(201).json({
      sucsses: true,
      msg: "user password updated succesfully",
      user: new_user,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
