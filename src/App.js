import logo from "./logo.svg";
import "./App.css";
import { app } from "./firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase";

function App() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const authWithGoogle = () => {
    firebase.auth().signInWithPopup(provider);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained" color="primary" onClick={authWithGoogle}>
          LOGIN
        </Button>
      </header>
    </div>
  );
}

export default App;
