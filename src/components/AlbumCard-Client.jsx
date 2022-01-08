import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const AlbumCardClient = ({ photo, handleSelectPhoto, handleDeselectPhoto }) => {
  const [isThumbUp, setIsThumbUp] = useState();
  const [isThumbDown, setIsThumbDown] = useState();

  const handleLikePhoto = (photo) => {
    setIsThumbUp(!isThumbUp);
    handleSelectPhoto(photo);

    setIsThumbDown(false);
  };

  const handleDislikePhoto = (photo) => {
    setIsThumbDown(!isThumbDown);
    handleDeselectPhoto(photo);

    setIsThumbUp(false);
  };
  return (
    <div>
      <img src={photo.url} alt="" />

      <FontAwesomeIcon
        color={isThumbUp ? "#a594f9" : ""}
        icon={faThumbsUp}
        size="lg"
        onClick={() => handleLikePhoto(photo)}
      />

      <FontAwesomeIcon
        color={isThumbDown ? "#a594f9" : ""}
        icon={faThumbsDown}
        size="lg"
        onClick={() => handleDislikePhoto(photo)}
      />
    </div>
  );
};

export default AlbumCardClient;
