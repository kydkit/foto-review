import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
//fire
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuthContext } from "../context/AuthContext";
//components
import UploadDropzone from "../components/UploadDropzone";
//other
import { SRLWrapper } from "simple-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import cardStyle from "../css/Card.module.css";

const AlbumPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [copy, setCopy] = useState(false);
  const [newSelection, setNewSelection] = useState([]);

  //create variable with unique link to customer
  const newLink = location.pathname.replace("album", "preview");

  //reach out to images collection on the db
  const colPhotosRef = collection(db, "images");

  const queryKey = ["images"];

  //query specific albumId
  const queryAlbumRef = query(
    colPhotosRef,
    where("albumId", "==", id),
    orderBy("created", "desc")
  );

  const photosQuery = useFirestoreQueryData(
    queryKey,
    queryAlbumRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  const handleShow = () => {
    setCopy(!copy);
    navigator.clipboard.writeText(newLink);
  };

  const handleSelectPhoto = (image) => {
    let index = newSelection.findIndex(
      (selection) => selection.name === image.name
    );
    if (index > -1) {
      newSelection.splice(index, 1);
      return;
    }
    setNewSelection([
      ...newSelection,
      { name: image.name, size: image.size, type: image.type },
    ]);
    return;
  };

  const handleNewAlbum = async () => {
    //generate uuid for an album
    const albumId = uuidv4();
    const albumName = `Album ${new Date().toLocaleString()}`;

    const albumRef = collection(db, "albums");

    await addDoc(albumRef, {
      created: serverTimestamp(),
      owner: currentUser.uid,
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
        owner: currentUser.uid,
        path: storageRef.fullPath,
        size: image.size,
        type: image.type,
        imageId,
        albumId,
        url,
      });
    });
    alert("A new album has been created");
    navigate("/");
  };

  return (
    <div>
      <h1>Welcome to your album </h1>
      {currentUser && (
        <button onClick={handleShow}>
          {copy ? "Copied" : "Copy"} link to share
        </button>
      )}

      {currentUser ? <UploadDropzone /> : ""}

      {photosQuery.isLoading && <span>Loading....</span>}

      {photosQuery.isError && <span>Something went wrong</span>}

      {photosQuery.data && (
        <SRLWrapper>
          {photosQuery.data.map((photo) => (
            <div key={photo.imageId} className={cardStyle.cards}>
              <img src={photo.url} alt="" />
              <input type="checkbox" onClick={() => handleSelectPhoto(photo)} />
            </div>
          ))}
        </SRLWrapper>
      )}

      {/* show button only when there are uploaded images */}
      {photosQuery.data && !photosQuery.data.length ? (
        ""
      ) : (
        <button onClick={handleNewAlbum}>Save selection in new album</button>
      )}
    </div>
  );
};

export default AlbumPage;
