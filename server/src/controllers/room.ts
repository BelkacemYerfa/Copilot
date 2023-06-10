import { Request, Response } from "express";
import {
  createRoom,
  roomDocument,
  getRoomById,
  deleteRoomById,
  getAllRooms,
} from "../models/Room";
import { getIdFromJWT } from "../models/User";

export const createNewRoom = async (req: Request, res: Response) => {
  try {
    const userId = await getIdFromJWT(req);
    const room: roomDocument = {
      creator: userId._id,
      messages: [],
    };
    const newRoom = await createRoom(room);
    res.status(201).json({
      success: true,
      msg: "room is created successfully",
      room: {
        id: newRoom._id,
        name: newRoom.name,
        messages: newRoom.messages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomId, roomTitle } = req.body;
    if (!roomId || !roomTitle) {
      return res.status(400).json({
        msg: "please check your id",
      });
    }
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        msf: "room not found",
      });
    }
    room.name = roomTitle;
    room.save();
    res.status(201).json({
      success: true,
      msg: "room Title Updated",
      room: {
        id: room._id,
        name: room.name,
      },
    });
  } catch {}
};

export const getRoomContent = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.body;
    if (!roomId) {
      return res.status(400).json({
        msg: "please check your id",
      });
    }
    const room = await getRoomById(roomId);
    if (!room) {
      return res.status(404).json({
        msg: "the provided id is not referencing any room ",
      });
    }
    const { _id, messages } = room;
    res.status(201).json({
      success: true,
      msg: "room's data is fetched successfully",
      room: {
        id: _id,
        messages,
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
        msg: "please check your id",
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
      success: true,
      msg: "room is deleted successfully",
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
