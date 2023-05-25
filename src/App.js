import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [originalTitle, setOriginalTitle] = useState('');

  useEffect(() => {
    // Remember the original document and set the new one
    setOriginalTitle(document.title);
    document.title = "Awesome Album App";

    const abortController = new AbortController();
    const signal = abortController.signal;

    // Fetch Users
    fetch('https://jsonplaceholder.typicode.com/users', {signal})
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error("Error fetching data:", error);
        }
      });

    return () => {
      // Abort fetch
      abortController.abort();
      // Reset document title on cleanup
      document.title = originalTitle;
    };
  }, [originalTitle]);

  useEffect(() => {
    if (currentUser) {
      const abortController = new AbortController();

      async function loadAlbums() {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
            {signal: abortController.signal}
          );
          const albumsFromAPI = await response.json();
          setAlbums(albumsFromAPI);
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.error("Error fetching data", error);
          }
        }
      }

      loadAlbums();
      return () => abortController.abort();
    }
  }, [currentUser]);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} />
      </div>
    </div>
  );
}


export default App;
