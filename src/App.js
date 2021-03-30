import { useState, useEffect } from "react";
import "./App.css";
import { app } from "./firebase";
import firebase from "firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  const provider = new firebase.auth.GoogleAuthProvider();
  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider);
  };

  const handleLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="App">
      <header className="App-header">
        {user && (
          <>
            <img
              src={user.photoURL}
              width="100px"
              height="100px"
              alt="Avatar"
            />
            <p>{user.displayName}</p>
          </>
        )}
        {user ? (
          <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg" onClick={handleLogOut}>
            LOGOUT
          </button>
        ) : (
          <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg" onClick={authWithGoogle}>
            LOGIN
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
