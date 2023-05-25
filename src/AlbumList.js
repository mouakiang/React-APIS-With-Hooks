import React from "react";


function AlbumList({ user, albums }) {
  if (!user) return <div>Please click on a user name to the left</div>;

  return (
    <div>
      <h2>{user.name}'s Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;