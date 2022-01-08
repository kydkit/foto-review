import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//fire
import { ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
//hooks
import useImages from "../hooks/useImages";
//components
import AlbumCardClient from "../components/AlbumCard-Client";
//other
import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import cardStyle from "../css/Card.module.css";

const AlbumPageClient = () => {
  const photosQuery = useImages();
  const navigate = useNavigate();
  const [newSelection, setNewSelection] = useState([]);
  const [counter, setCounter] = useState(0);

  //add selection to new array
  const handleSelectPhoto = (image) => {
    let index = newSelection.findIndex(
      (selection) => selection.name === image.name
    );
    //if image already exist in array, remove it from array with splice
    if (index > -1) {
      newSelection.splice(index, 1);
      console.log("deleted from newSelection array", newSelection);
      setCounter(counter - 1);
      return;
    }
    //if image doesn't exist in array, add to array
    setNewSelection([
      ...newSelection,
      {
        name: image.name,
        size: image.size,
        type: image.type,
        owner: image.owner,
      },
    ]);
    setCounter(counter + 1);
  };
  console.log("added to newSelection array", newSelection);

  const handleDeSelectPhoto = (image) => {
    console.log("deselect");
    let index = newSelection.findIndex(
      (selection) => selection.name === image.name
    );
    //if image already exist in array, remove it from array with splice
    if (index > -1) {
      newSelection.splice(index, 1);
      console.log("deleted from newSelection array", newSelection);
      setCounter(counter - 1);
      return;
    }
  };

  const handleNewAlbum = async () => {
    const owner = newSelection && newSelection[0].owner;
    console.log(owner);
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

    newSelection.forEach(async (image) => {
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
    alert("Your selections have been sent to the photographer");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to your album (customer)</h1>

      {counter}

      {photosQuery.isLoading && <span>Loading....</span>}

      {photosQuery.isError && <span>Something went wrong</span>}

      {photosQuery.data && (
        <SRLWrapper>
          {photosQuery.data.map((photo) => (
            <div key={photo.imageId} className={cardStyle.cards}>
              <AlbumCardClient
                photo={photo}
                handleSelectPhoto={handleSelectPhoto}
                handleDeselectPhoto={handleDeSelectPhoto}
              />
            </div>
          ))}
        </SRLWrapper>
      )}

      {/* show button only when there are uploaded images */}
      {photosQuery.data && !photosQuery.data.length ? (
        ""
      ) : (
        <button onClick={handleNewAlbum}>Send</button>
      )}
    </div>
  );
};

export default AlbumPageClient;
