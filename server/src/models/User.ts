import { Date, Schema, Types, model } from "mongoose";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
interface userDocument {
  name: string;
  email: string;
  profilePicture?: String;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  rooms?: Types.ObjectId[];
}

export const User = new Schema<userDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "rooms",
    },
  ],
});

export const UserModel = model("users", User, "users");

export const getUserByMail = async (email: string) =>
  UserModel.findOne({ email });
export const getUserById = async (userId: string) => UserModel.findById(userId);
export const createUser = async (user: userDocument) => UserModel.create(user);
export const deleteUser = async (email: string, id: string) =>
  UserModel.findOneAndDelete({ email, id });
export const updateUser = async (
  email: string,
  id: string,
  user: userDocument
) => {
  UserModel.findByIdAndUpdate({ email, id }, user, { new: true });
};
export const createJwtAuth = async (userId: string) =>
  await jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
export const getIdFromJWT = async (req: Request) => {
  const token = req.cookies.copilote_auth;

  const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  const userId = jsonwebtoken.decode(token) as JwtPayload;
  let currentUserId: string = "";
  for (let key in userId) {
    if (typeof userId[key] === "string") {
      currentUserId = userId[key];
    }
  }
  const findUser = await getUserById(currentUserId);
  return findUser;
};
