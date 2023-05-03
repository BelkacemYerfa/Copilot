import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Request, Response } from "express";
import { getUser } from "../models/User";
import { mailConfig } from "../interfaces/mailConfig";
import { CustomError } from "errors/CustomError";
import { VerifyMailContent } from "../static/VerfiyMailContent";

export const VerifyMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const checkUser = await getUser(email);
    if (!checkUser) {
      throw new CustomError("user not found , check your credentials", 401);
    }
    const verfiyNumber = Math.floor(Math.random() * 1000000);
    const config: mailConfig = {
      service: "gmail",
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);
    const MailGenerator: Mailgen = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });
    let mail = MailGenerator.generate(
      VerifyMailContent({ name: checkUser.name, verfiyCode: verfiyNumber })
    );
    let message = {
      from: process.env.USER_MAIL,
      to: checkUser.email,
      subject: "Code Verification",
      html: mail,
    };
    transporter.sendMail(message).then(() => {
      return res.status(201).json({
        msg: "email recieved sucssesfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
