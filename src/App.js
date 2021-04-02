import { useState, useEffect } from "react";
import "./App.css";
import { app } from "./firebase";
import { Button } from "@material-ui/core";
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

  if (user) {
    const document = firebase
      .firestore()
      .collection("User")
      .doc(user.uid)
      .get();
    console.log(document);
  }

  //const userInfo = firebase.firestore().collection("User").doc(user.uid);

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
          <Button variant="contained" color="primary" onClick={handleLogOut}>
            LOGOUT
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={authWithGoogle}>
            LOGIN
          </Button>
        )}
      </header>
    </div>
  );
}

export default App;
