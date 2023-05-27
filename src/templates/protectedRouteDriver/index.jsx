import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getStringLocal } from "../../utils/config";

const ProtectedRouteDriver = ({ children }) => {
  const userProfile = useSelector((state) => state.UserReducer.userLogin);
  const user = getStringLocal("token");
  if (userProfile.role === "driver" && user) {
    return children;
  } else {
    return <Navigate to="/error-permission" replace />;
  }
};

export default ProtectedRouteDriver;
