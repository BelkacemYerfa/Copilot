import { useMutation } from "@tanstack/react-query";
import { UserAuth } from "../interfaces&types/User";
import axios from "axios";

const registerUser = (user: UserAuth) => {
  return axios.post("http://localhost:5000/api/v1/auth/register", user);
};

const loginUser = (user: UserAuth) => {
  return axios.post("http://localhost:5000/api/v1/auth/login", user);
};

export const useLogUser = () => {
  return useMutation(loginUser);
};

export const useRegisterUser = () => {
  return useMutation(registerUser);
};
