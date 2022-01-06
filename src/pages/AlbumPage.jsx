import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
//components
import UploadDropzone from "../components/UploadDropzone";
import PhotoCard from "../components/PhotoCard";
import { SRLWrapper } from "simple-react-lightbox";

const AlbumPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [copy, setCopy] = useState(false);
  // const [newLink, setNewLink] = useState();

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

  return (
    <div>
      <h1>Album name: {id} </h1>
      <button onClick={handleShow}>{copy ? "Copied" : "Copy link"}</button>

      <UploadDropzone />

      {photosQuery.isLoading && <span>Loading....</span>}

      {photosQuery.isError && <span>Something went wrong</span>}

      {photosQuery.data && (
        <SRLWrapper>
          {photosQuery.data.map((photo) => (
            <PhotoCard photo={photo} key={photo.url} />
          ))}
        </SRLWrapper>
      )}
    </div>
  );
};

export default AlbumPage;
