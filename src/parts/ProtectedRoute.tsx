import type { ReactNode } from "react";
import { useAuth } from "../useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: "user" | "admin";
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
