import { useAuthUser, useUpdateUser } from "../../../hooks/useAuthUser";
import modify from "../../../assets/icons/modify.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";

export const ProfileImage = () => {
  const {
    user: { profilePicture, name },
  } = useAuthUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="h-full w-full sm:w-1/2 flex items-center justify-center ">
      <div className="relative">
        {profilePicture ? (
          <div className="relative flex flex-col gap-y-3">
            <div className="relative">
              <img
                className="rounded-full w-40 h-40 object-cover"
                src={profilePicture}
                alt={name}
              />
              {isLoading ? (
                <div className="absolute left-0 top-0 bg-gray-500/80 rounded-full w-40 h-40 flex items-center justify-center ">
                  <InfinitySpin width="200" color="#fff" />
                </div>
              ) : null}
            </div>
            <ModifyPicture setIsLoading={setIsLoading} />
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

interface ModifyPictureProps {
  setIsLoading?: (value: boolean) => void;
}

const ModifyPicture = ({ setIsLoading }: ModifyPictureProps) => {
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
            set(data.data.user);
            toast.success(data.data?.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
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
  if (isLoading) {
    setIsLoading!(true);
  } else {
    setIsLoading!(false);
  }
  return (
    <>
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
      <ToastContainer position="top-right" />
    </>
  );
};
