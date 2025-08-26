import { Navigate, Outlet } from "react-router-dom";
import { SharedState } from "../../context/SharedContext";
import { ProtectedRouteProps } from "./protected-route.interface";

const ProtectedRoute = ({ profileIds }: ProtectedRouteProps) => {
  const { user } = SharedState();

  if (!user) {
    return <Navigate to="/" />;
  }

  return profileIds.includes(+user["jvris.User.Perfil"]) ? (
    <Outlet />
  ) : (
    <Navigate to="/not-authorized" />
  );
};

export default ProtectedRoute;
