import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import cardStyle from "../css/Card.module.css";

const ImageCardClient = ({ photo, handleSelectPhoto, handleDeselectPhoto }) => {
  const [isThumbUp, setIsThumbUp] = useState();
  const [isThumbDown, setIsThumbDown] = useState();

  const handleLikePhoto = (photo) => {
    setIsThumbUp(true);
    handleSelectPhoto(photo);

    setIsThumbDown(false);
  };

  const handleDislikePhoto = (photo) => {
    setIsThumbDown(true);
    handleDeselectPhoto(photo);

    setIsThumbUp(false);
  };
  return (
    <div className={cardStyle.cards}>
      <img src={photo.url} alt={photo.name} />

      <div className={cardStyle.thumbsContainer}>
        <FontAwesomeIcon
          color={isThumbUp ? "#a594f9" : ""}
          icon={faThumbsUp}
          size="lg"
          className={cardStyle.thumb}
          onClick={() => handleLikePhoto(photo)}
        />

        <FontAwesomeIcon
          color={isThumbDown ? "#a594f9" : ""}
          icon={faThumbsDown}
          size="lg"
          className={cardStyle.thumb}
          onClick={() => handleDislikePhoto(photo)}
        />
      </div>
    </div>
  );
};

export default ImageCardClient;
