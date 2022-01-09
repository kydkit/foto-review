import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
//fire
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
//components
import AlbumsList from "../components/AlbumsList";
//hooks
import useAlbums from "../hooks/useAlbums";
//other
import { v4 as uuidv4 } from "uuid";
import style from "../css/HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const albumsQuery = useAlbums({ fetchOnlyCurrentUser: true });
  const { currentUser } = useAuthContext();
  const [show, setShow] = useState();
  const albumNameRef = useRef();

  const createAlbum = () => {
    setShow(!show);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!albumNameRef.current.value) {
      return;
    }

    //generate uuid for an album
    const albumId = uuidv4();

    //reach out to albums collection in the db
    const albumRef = collection(db, "albums");

    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner: currentUser.uid,
      albumName: albumNameRef.current.value,
      albumId,
    });

    //hide the input field
    setShow(false);

    //go directly to album to upload images
    navigate(`/album/${albumId}`);
  };

  return (
    <div className={style.superContainer}>
      <h1>Welcome to Foto-Foto</h1>
      <p>Hi {currentUser.email}</p>
      <button onClick={createAlbum}>{show ? "-" : "+"} Create Album</button>

      {show ? (
        <form onSubmit={handleNameSubmit}>
          <input type="text" placeholder="name" ref={albumNameRef} required />
          <button>Save</button>
        </form>
      ) : (
        ""
      )}

      <AlbumsList albums={albumsQuery} />
    </div>
  );
};

export default HomePage;
