import React from "react";
import { Link } from "react-router-dom";
const AlbumsList = ({ albums }) => {
  return (
    <div>
      <h2>A collection of all albums</h2>

      {albums.isLoading && <span>Loading...</span>}

      {albums.isError && <span>Something went wrong</span>}

      {albums.data &&
        albums.data.map((album) => (
          <div key={album.albumId}>
            <Link to={`/album/${album.albumId}`}>
              <img src="assets/folder.svg" alt="" />
            </Link>
            <p>{album.albumName}</p>
          </div>
        ))}
    </div>
  );
};

export default AlbumsList;
