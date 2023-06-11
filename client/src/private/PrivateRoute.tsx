import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export const PrivateRoute = (): JSX.Element => {
  const { user } = useAuthUser();
  console.log(user);
  return user ? <Outlet /> : <Navigate to="/auth" />;
};
