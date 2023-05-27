import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getStringLocal } from "../../utils/config";

const ProtectedRoleUser = () => {
  const userProfile = useSelector((state) => state.UserReducer.userLogin);
  const user = getStringLocal("token");
  if (userProfile.role !== "admin" && userProfile.role !== "driver") {
    return <Outlet />;
  } else {
    // if (user) {
    return <Navigate to="/error-permission" replace />;
    // }
    // return <Navigate to="/login" />;
  }
  //&& user
};

export default ProtectedRoleUser;
