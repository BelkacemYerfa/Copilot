import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Request, Response } from "express";
import { getUser } from "../models/User";
import { mailConfig } from "../interfaces/mailConfig";
import { VerifyMailContent } from "../static/VerfiyMailContent";

export const VerfiyMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const checkUser = await getUser(email);
    if (!checkUser) {
      return res.status(404).json({
        msg: "User not Found , please check you credentails",
      });
    }
    const verfiyNumber = Math.floor(Math.random() * 100000);
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
