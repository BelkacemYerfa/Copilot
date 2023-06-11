import { useAuthUser } from "../../../hooks/useAuthUser";
import modify from "../../../assets/icons/modify.svg";
import { motion } from "framer-motion";
import { ChangeEvent, EventHandler } from "react";

export const ProfileImage = () => {
  const {
    user: { profilePicture, name },
  } = useAuthUser();
  return (
    <div className="h-full w-1/2 flex items-center justify-center ">
      <div className="relative">
        {profilePicture ? (
          <div className="relative flex flex-col gap-y-3">
            <img
              height={50}
              width={50}
              className="rounded-full"
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
  const SaveFile = (e: any) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log(file);
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
          onChange={(e) => SaveFile(e)}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </motion.div>
  );
};
