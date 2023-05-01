import { Schema, Types, model } from "mongoose";

export interface roomDocument {
  name?: string;
  creator: Types.ObjectId;
  content: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const Room = new Schema<roomDocument>({
  name: {
    type: String,
    default: "new room",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const RoomModel = model("rooms", Room, "rooms");

export const getRoomById = async (id: string) => RoomModel.findById(id);
export const createRoom = async (room: roomDocument) => RoomModel.create(room);
export const deleteRoomById = async (id: string) =>
  RoomModel.findByIdAndDelete(id);
export const updateRoomById = async (id: string, room: roomDocument) =>
  RoomModel.findByIdAndUpdate(id, room);
export const getAllRooms = async () => RoomModel.find({});
