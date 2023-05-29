import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";
import { useContext } from "react";

const CreateCreaptedPass = (email: string) => {
  return axios.post(
    "http://localhost:8000/api/v1/auth/verifyEmail",
    { email },
    {
      withCredentials: true,
    }
  );
};

export const useCreaptedPass = () => {
  return useMutation(CreateCreaptedPass);
};

export const useSetCreaptedPass = () => {
  const {
    state: { creaptedCode },
    setCreaptedPass,
  } = useContext(GlobalContext);
  return { creaptedCode, setCreaptedPass };
};
