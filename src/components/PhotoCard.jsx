import React from "react";
import cardStyle from "../css/Card.module.css";

const PhotoCard = ({ photo }) => {
  return (
    <div className={cardStyle.cards}>
      <img src={photo.url} alt="" />{" "}
    </div>
  );
};

export default PhotoCard;
