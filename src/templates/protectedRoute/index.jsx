import { Navigate } from "react-router-dom";
import { getStringLocal } from "../../utils/config"

const ProtectedRoute = ({ children }) => {
  const user = getStringLocal("token");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;