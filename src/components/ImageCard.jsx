import React from "react";
import cardStyle from "../css/Card.module.css";

const ImageCard = ({ photo, handleSelectPhoto }) => {
  return (
    <div className={cardStyle.cards}>
      <img src={photo.url} alt={photo.name} />

      <label>
        <input type="checkbox" onClick={() => handleSelectPhoto(photo)} />
        Select pic
      </label>
    </div>
  );
};

export default ImageCard;
