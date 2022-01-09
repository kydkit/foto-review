import React from "react";
import AlbumCard from "./AlbumCard";
import style from "../css/AlbumsList.module.css";

const AlbumsList = ({ albums }) => {
  return (
    <>
      <h2>A collection of all albums</h2>
      <div className={style.albumsContainer}>
        {albums.isLoading && <span>Loading...</span>}

        {albums.isError && <span>Something went wrong</span>}

        {albums.data &&
          albums.data.map((album) => (
            <AlbumCard album={album} key={album.albumId} />
          ))}
      </div>
    </>
  );
};

export default AlbumsList;
