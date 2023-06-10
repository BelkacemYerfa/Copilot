import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";
import { UserAuth } from "../interfaces&types&static/User";

const CreateCreaptedPass = (email: string) => {
  return axios.post(
    "http://localhost:8000/api/v1/auth/verifyEmail",
    { email },
    {
      withCredentials: true,
    }
  );
};

const setNewPass = (user: UserAuth) => {
  return axios.patch("http://localhost:8000/api/v1/auth/newPassword", user, {
    withCredentials: true,
  });
};

export const useCreaptedPass = () => {
  return useMutation(CreateCreaptedPass);
};

export const useNewPass = () => {
  return useMutation(setNewPass);
};

//auth checker pass
export const useSetCreaptedPass = () => {
  const {
    state: { creaptedCode },
    setCreaptedPass,
  } = useContext(GlobalContext);
  return { creaptedCode, setCreaptedPass };
};
