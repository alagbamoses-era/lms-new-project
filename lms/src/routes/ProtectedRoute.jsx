import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);

  // Not logged in → redirect to login
  if (!auth.account) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;