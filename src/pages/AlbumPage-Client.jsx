import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//fire
import { ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
//hooks
import useImages from "../hooks/useImages";
//components
import ImageCardClient from "../components/ImageCard-Client";
//other
import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import style from "../css/AlbumPageClient.module.css";

const AlbumPageClient = () => {
  const photosQuery = useImages();
  const navigate = useNavigate();
  const [newSelection, setNewSelection] = useState([]);

  const handleSelectPhoto = (image) => {
    let index = newSelection.findIndex(
      (selection) => selection.name === image.name
    );
    //if image already exist in array, remove it from array with splice
    if (index > -1) {
      newSelection.splice(index, 1);
    }
    setNewSelection([
      ...newSelection,
      {
        name: image.name,
        size: image.size,
        type: image.type,
        owner: image.owner,
        isSelected: true,
      },
    ]);
  };

  const handleDeselectPhoto = (image) => {
    let index = newSelection.findIndex(
      (selection) => selection.name === image.name
    );
    //if image already exist in array, remove it from array with splice
    if (index > -1) {
      newSelection.splice(index, 1);
    }
    setNewSelection([
      ...newSelection,
      {
        name: image.name,
        size: image.size,
        type: image.type,
        owner: image.owner,
        isSelected: false,
      },
    ]);
  };

  const numberLiked = newSelection.filter(
    (liked) => liked.isSelected === true
  ).length;

  const handleNewAlbum = async () => {
    const owner = newSelection && newSelection[0].owner;
    // generate uuid for an album
    const albumId = uuidv4();
    //create new album name with date and time
    const albumName = `Album ${new Date().toLocaleString()}`;
    const albumRef = collection(db, "albums");
    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner,
      albumName,
      albumId,
    });

    const likedPics = newSelection.filter(
      (likedPics) => likedPics.isSelected === true
    );

    likedPics.forEach(async (image) => {
      const imageId = uuidv4();
      const storageFullPath = `images/${image.name}`;
      //reach out to specific storage
      const storageRef = ref(storage, storageFullPath);
      //get download url
      const url = await getDownloadURL(storageRef);
      //create ref to db 'images'
      const collectionRef = collection(db, "images");
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        name: image.name,
        owner,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        imageId,
        albumId,
        url,
      });
    });
    navigate("/confirmation");
  };

  return (
    <div className={style.superContainer}>
      {/* <h2>Title: {nameOfAlbum} </h2> */}
      <h2>Welcome to your album</h2>
      <p>
        Select the photos you like and dislike and send them back to the
        photographer.
      </p>

      {photosQuery.isLoading && <span>Loading....</span>}

      {photosQuery.isError && (
        <span>Something went wrong. {photosQuery.error}</span>
      )}

      {photosQuery.data && (
        <SRLWrapper>
          <div className={style.cardsContainer}>
            {photosQuery.data.map((photo, index) => (
              <ImageCardClient
                key={index}
                photo={photo}
                handleSelectPhoto={handleSelectPhoto}
                handleDeselectPhoto={handleDeselectPhoto}
              />
            ))}
          </div>
        </SRLWrapper>
      )}

      {/* show button only when there are uploaded images */}
      {photosQuery.data && photosQuery.data.length !== newSelection.length ? (
        <button disabled className={style.buttonStickyMustDo}>
          Like or dislike all pictures
        </button>
      ) : numberLiked ? (
        <button onClick={handleNewAlbum} className={style.buttonSticky}>
          <span>
            You have liked {numberLiked} of{" "}
            {photosQuery.data && photosQuery.data.length} photos
          </span>
          <span>Send</span>
        </button>
      ) : (
        <button onClick={handleNewAlbum} className={style.buttonSticky}>
          <span>
            You are sending 0 liked photos{" "}
            <span role="img" aria-label="frown face">
              🙁
            </span>
          </span>
          <span>Send</span>
        </button>
      )}
    </div>
  );
};

export default AlbumPageClient;
