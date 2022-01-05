import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const LogoutPage = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>please wait while you are being logged out</h1>
    </div>
  );
};

export default LogoutPage;
