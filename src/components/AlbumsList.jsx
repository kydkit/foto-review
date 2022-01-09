import React from "react";

import AlbumCard from "./AlbumCard";

const AlbumsList = ({ albums }) => {
  return (
    <div>
      <h2>A collection of all albums</h2>

      {albums.isLoading && <span>Loading...</span>}

      {albums.isError && <span>Something went wrong</span>}

      {albums.data &&
        albums.data.map((album) => (
          <div key={album.albumId}>
            <AlbumCard album={album} />
          </div>
        ))}
    </div>
  );
};

export default AlbumsList;
