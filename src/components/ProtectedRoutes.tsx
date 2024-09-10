import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "./Layout";

export const ProtectedRoutes = () => {
  // TODO: Use authentication token
  const { token } = useAuth();

  if (token) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }

  return <Navigate to="/login" replace />;
};
