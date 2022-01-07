import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
//style
import style from "../../css/Nav.module.css";

const Navigation = () => {
  const { currentUser } = useAuthContext();

  return (
    <div className={style.navContainer}>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="31.5"
          viewBox="0 0 36 31.5"
        >
          <path
            id="Icon_awesome-camera"
            data-name="Icon awesome-camera"
            d="M36,10.125v20.25a3.376,3.376,0,0,1-3.375,3.375H3.375A3.376,3.376,0,0,1,0,30.375V10.125A3.376,3.376,0,0,1,3.375,6.75H9.563l.865-2.313A3.37,3.37,0,0,1,13.584,2.25h8.824a3.37,3.37,0,0,1,3.157,2.187l.872,2.313h6.188A3.376,3.376,0,0,1,36,10.125ZM26.438,20.25A8.438,8.438,0,1,0,18,28.688,8.444,8.444,0,0,0,26.438,20.25Zm-2.25,0A6.188,6.188,0,1,1,18,14.063,6.2,6.2,0,0,1,24.188,20.25Z"
            transform="translate(0 -2.25)"
            fill="#fff"
          />
        </svg>
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
