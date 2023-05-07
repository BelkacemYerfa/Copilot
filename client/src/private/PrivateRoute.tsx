import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthUser } from "../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const PrivateRoute = (): JSX.Element => {
  const navigate = useNavigate();
  const { user, set } = useAuthUser();
  //check the is logged session method with the context api
  console.log(user);

  return user.name ? <Outlet /> : <Navigate to="/auth" />;
};
