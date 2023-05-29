import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Request, Response } from "express";
import { getUserByMail } from "../models/User";
import { mailConfig } from "../interfaces/mailConfig";
import { VerifyMailContent } from "../static/VerfiyMailContent";

export const VerifyMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log(email.length);
    const checkUser = await getUserByMail(email);
    if (!checkUser) {
      return res.status(404).json({
        msg: "their is no user associate with this email",
      });
    }
    const verfiyNumber = Math.floor(Math.random() * 1000000);
    if (verfiyNumber.toString().length < 6) {
      verfiyNumber.toString().padStart(6, "0");
    }
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
      VerifyMailContent({ name: checkUser.name, verifyCode: verfiyNumber })
    );
    let message = {
      from: process.env.USER_MAIL,
      to: checkUser.email,
      subject: "Code Verification",
      html: mail,
    };
    transporter.sendMail(message).then(() => {
      return res.status(201).json({
        msg: "email received successfully",
      });
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
