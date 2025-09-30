import type { ReactNode } from "../../index";
import { Navigate } from "../../index";
import { useAuth } from "./useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: "user" | "admin";
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  // todo: logout can land on /login (because of this redirect when user is null)
  // would be nicer if logout always went to "/" instead?
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
