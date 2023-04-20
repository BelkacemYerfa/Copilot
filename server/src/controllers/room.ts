import { Request, Response } from "express";
import {
  createRoom,
  roomDocement,
  getRoomById,
  deleteRoomById,
  getAllRooms,
} from "../models/Room";

export const createNewRoom = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const room: roomDocement = {
      creator: userId,
      content: [],
    };
    const newRoom = await createRoom(room);
    const { _id, name } = newRoom;
    res.status(201).json({
      suscces: true,
      msg: "room is created sucssesfully",
      room: {
        id: _id,
        name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const getRoomContent = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    if (!roomId) {
      return res.status(400).json({
        msg: "pleae check your id",
      });
    }
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        msg: "the provided id is not referencing any room ",
      });
    }
    const { _id, content } = room;
    res.status(201).json({
      suscces: true,
      msg: "room's data is fetched succsefully",
      room: {
        id: _id,
        content: content,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({
        msg: "pleae check your id",
      });
    }
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        msg: "the provided id is not referencing any room ",
      });
    }
    await deleteRoomById(roomId);
    res.status(200).json({
      suscces: true,
      msg: "room is deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const fetchAllRooms = async (req: Request, res: Response) => {
  try {
    const allRooms = await getAllRooms();
    if (!allRooms) {
      return res.status(404).json({
        msg: "their is no room found",
      });
    }
    const rooms = allRooms.map((room) => {
      return {
        name: room.name,
        id: room._id,
      };
    });
    res.status(201).json({
      sucssess: true,
      msg: "all the rooms are fetched succsefully",
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};
