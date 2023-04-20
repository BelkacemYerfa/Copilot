import { Date, Schema, Types, model } from "mongoose";

interface userDocement {
  name: string;
  email: string;
  profilePicture?: Buffer;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  sessionToken: string;
  rooms?: Types.ObjectId[];
}

export const User = new Schema<userDocement>({
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
    type: Buffer,
    contentType: String,
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
  sessionToken: {
    type: String,
    select: false,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "rooms",
    },
  ],
});

export const UserModel = model("users", User, "users");

export const getUser = async (email: string) => UserModel.findOne({ email });
export const createUser = async (user: userDocement) => UserModel.create(user);
export const deleteUser = async (email: string, id: string) =>
  UserModel.findOneAndDelete({ email, id });
export const updateUser = async (
  email: string,
  id: string,
  user: userDocement
) => {
  UserModel.findByIdAndUpdate({ email, id }, user, { new: true });
};
export const getUserBySessionToken = async (sessionToken: string) =>
  UserModel.findOne({ sessionToken });
