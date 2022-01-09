import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const AlbumCard = ({ album }) => {
  const albumChangeNameRef = useRef();
  const [show, setShow] = useState();

  useEffect(() => {}, [albumChangeNameRef]);

  const handleEditName = () => {
    setShow(!show);
  };

  const handleNameChangeSubmit = async (e) => {
    e.preventDefault();

    if (!albumChangeNameRef.current.value) {
      return;
    }

    const albumNameRef = doc(db, "albums", album._id);

    await updateDoc(albumNameRef, {
      albumName: albumChangeNameRef.current.value,
    });
    setShow(false);
  };

  return (
    <>
      <Link to={`/album/${album.albumId}`}>
        <img src="assets/folder.svg" alt="" />
      </Link>
      <div>
        <span>{album.albumName}</span>
        <FontAwesomeIcon icon={faPen} onClick={handleEditName} />
        {show ? (
          <form onSubmit={(e) => handleNameChangeSubmit(e)}>
            <input
              type="text"
              placeholder="name"
              ref={albumChangeNameRef}
              required
            />
            <button>Save</button>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AlbumCard;
