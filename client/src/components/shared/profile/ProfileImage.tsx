import { useAuthUser, useUpdateUser } from "../../../hooks/useAuthUser";
import modify from "../../../assets/icons/modify.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";

export const ProfileImage = () => {
  const {
    user: { profilePicture, name },
  } = useAuthUser();

  return (
    <div className="h-full w-full sm:w-1/2 flex items-center justify-center ">
      <div className="relative">
        {profilePicture ? (
          <div className="relative flex flex-col gap-y-3">
            <img
              className="rounded-full w-full h-40"
              src={profilePicture}
              alt={name}
            />
            <ModifyPicture />
          </div>
        ) : (
          <div className="relative flex flex-col gap-y-3 ">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer h-[10rem] w-[10rem] flex items-center justify-center rounded-full bg-border_Color"
            >
              <p className="text-[8rem] text-main_color">{name[0]}</p>
            </motion.div>
            <ModifyPicture />
          </div>
        )}
      </div>
    </div>
  );
};

const ModifyPicture = () => {
  const {
    user: { name, email },
    set,
  } = useAuthUser();
  const { mutate: updateProfilePicture, isLoading } = useUpdateUser();

  const saveFile = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "jtbx0fay");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dz2kakc9y/image/upload",
          formData
        );
        const updatedUser = {
          name,
          email,
          profilePicture: response.data.secure_url,
        };
        updateProfilePicture(updatedUser, {
          onSuccess: (data) => {
            console.log(data.data);
            set(data.data.user);
          },
          onError: (error) => {
            console.log(error);
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        duration: 0.2,
      }}
      className="relative cursor-pointer rounded-lg px-2 py-1 flex items-center justify-between bg-auth_bg_main_color"
    >
      <label className="flex flex-col items-center justify-center w-full ">
        <div className="flex gap-x-2 items-center justify-center px-2 py-1">
          <p>Change Image</p>
          <img src={modify} alt="modify" />
        </div>
        <input
          onChange={(e) => saveFile(e)}
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
        />
      </label>
    </motion.div>
  );
};
