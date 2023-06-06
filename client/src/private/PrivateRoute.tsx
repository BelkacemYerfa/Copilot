import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export const PrivateRoute = (): JSX.Element => {
  const { user } = useAuthUser();
  console.log(user);
  return user.name ? <Outlet /> : <Navigate to="/auth" />;
};
