import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = (): JSX.Element => {
  const auth: string = "";
  return auth ? <Outlet /> : <Navigate to="/auth" />;
};
