import { Outlet, Navigate } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuthUser";

export const PrivateRoute = (): JSX.Element => {
  const { user } = useAuthUser();
  return user.name ? <Outlet /> : <Navigate to="/auth" />;
};
