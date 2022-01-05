import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
//style
import style from "../../css/Nav.module.css";

const Navigation = () => {
  const location = useLocation();
  const { currentUser } = useAuthContext();

  return (
    <div className={style.navContainer}>
      <Link to="/">
        <img src="assets/logo.svg" alt="logo" width="55" />
      </Link>

      {currentUser ? (
        <Link to="/logout" className={style.aLink}>
          Log out
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navigation;
