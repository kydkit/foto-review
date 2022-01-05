import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const RequireAuth = ({ children, redirectTo }) => {
  const { currentUser } = useAuthContext();
  return currentUser ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
