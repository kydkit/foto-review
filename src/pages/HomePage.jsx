import React from "react";
import { useNavigate } from "react-router";
import { useState, useRef } from "react";
import useAlbums from "../hooks/useAlbums";

import { useAuthContext } from "../context/AuthContext";
import AlbumsList from "../components/AlbumsList";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const navigate = useNavigate();
  const albumsQuery = useAlbums();
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
    <div>
      <h1>Home Page</h1>
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
