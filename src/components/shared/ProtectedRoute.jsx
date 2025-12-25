import { Navigate } from "react-router";
import { useRouteLoaderData } from "react-router";

export default function ProtectedRoute({ children }) {
  const userData = useRouteLoaderData("root");

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
