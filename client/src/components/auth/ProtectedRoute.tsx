import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type ProtectedRouteProps = {
  allowedRoles?: ("student" | "faculty" | "admin")[];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    (!user || !allowedRoles.includes(user.role as "student" | "faculty" | "admin"))
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}