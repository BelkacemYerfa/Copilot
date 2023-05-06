import { useMutation } from "@tanstack/react-query";
import { UserAuth } from "../interfaces&types&static/User";
import axios from "axios";
import { IUser } from "../@types/auth";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const registerUser = (user: UserAuth) => {
  return axios.post("http://localhost:5000/api/v1/auth/register", user, {
    withCredentials: true,
  });
};

const loginUser = (user: UserAuth) => {
  return axios.post("http://localhost:5000/api/v1/auth/login", user, {
    withCredentials: true,
  });
};

export const useLogUser = () => {
  return useMutation(loginUser);
};

export const useRegisterUser = () => {
  return useMutation(registerUser);
};

type useAuthUserType = {
  user: IUser;
  set: (user: IUser) => void;
};

export const useAuthUser = (): useAuthUserType => {
  const {
    state: { user },
    set,
  } = useContext(AuthContext);
  return { user, set };
};
