import React from "react";
import style from "../css/Confirmation.module.css";

const ConfirmationPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.mainText}>
        Thanks for your reply. Our photographer will get back to you regarding
        your selected photos{" "}
        <span role="img" aria-label="waving hand">
          👋
        </span>
      </h1>
    </div>
  );
};

export default ConfirmationPage;
