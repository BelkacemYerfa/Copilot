import { useState, useEffect } from "react";
import Audio from "../../../assets/icons/audio.svg";
import picture from "../../../assets/icons/picture.svg";
import { motion } from "framer-motion";
import { set, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { UserPrompt } from "../../../validation/ChatInput";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useChat } from "../../../hooks/useChat";
import ReactPlayer from "react-player";

type UserPromptType = z.infer<typeof UserPrompt>;

interface Id {
  id?: string;
}

export const ChatInput = ({ id }: Id) => {
  const { Rooms, setRoomMessages } = useChat();
  const { register, handleSubmit, watch } = useForm<UserPromptType>({
    resolver: zodResolver(UserPrompt),
  });
  const submiter: SubmitHandler<UserPromptType> = (
    userPrompt: UserPromptType
  ) => {
    Rooms.map((room) => {
      if (room.id === id) {
        setRoomMessages({
          ...room,
          messages: [
            ...room.messages,
            {
              id: `${crypto.randomUUID()}`,
              message: userPrompt.input,
              createdAt: "2021-09-25T12:00:00.000Z",
              updatedAt: "2021-09-25T12:00:00.000Z",
              name: "john doe",
              profilePicture: "https://i.pravatar.cc/150?img=68",
            },
            {
              id: `${crypto.randomUUID()}`,
              message: userPrompt.input,
              createdAt: "2021-09-25T12:00:00.000Z",
              updatedAt: "2021-09-25T12:00:00.000Z",
              name: "Copilote",
            },
          ],
        });
      }
    });
  };
  const createAudio = () => {
    return navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        console.log(stream);
      });
  };
  return (
    <section className="flex w-fit p-3 gap-x-4 rounded-xl bg-chat_Input_Bg backdrop-blur-sm border-border_Color border ">
      <div className="flex items-center gap-x-2 ">
        <div>
          <motion.img
            src={Audio}
            initial={false}
            whileHover={{
              scale: 1.15,
            }}
            onClick={createAudio}
            height={25}
            width={25}
            alt="audio Icon"
          />
        </div>
        <div>
          <motion.img
            src={picture}
            initial={false}
            whileHover={{
              scale: 1.15,
            }}
            height={25}
            width={25}
            alt="picture Icon"
          />
        </div>
      </div>
    </section>
  );
};
