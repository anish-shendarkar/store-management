import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[]; // e.g. ["admin", "owner"]
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const auth = useContext(AuthContext);

  if (!auth) return <Navigate to="/login" replace />; // context not loaded

  const { token, role } = auth;

  if (!token) {
    // user not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role || "")) {
    // user logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  // allowed ✅
  return <>{children}</>;
};

export default PrivateRoute;
