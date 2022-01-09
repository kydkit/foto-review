import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
//fire
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
//others
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import style from "../css/Album.module.css";

const AlbumCard = ({ album }) => {
  const albumChangeNameRef = useRef();
  const [show, setShow] = useState();

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
    <div className={style.folderGroup}>
      <Link to={`/album/${album.albumId}`} className={style.folder}>
        <img src="assets/folder.svg" alt="" />
      </Link>
      <div className={style.folderInfo}>
        <span>{album.albumName}</span>
        <FontAwesomeIcon
          icon={faPen}
          onClick={handleEditName}
          className={style.pen}
        />
        {show ? (
          <form
            onSubmit={(e) => handleNameChangeSubmit(e)}
            className={style.nameForm}
          >
            <input
              type="text"
              placeholder="name"
              ref={albumChangeNameRef}
              required
            />
            <button className={style.saveButton}>Save</button>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AlbumCard;
