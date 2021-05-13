import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Firebase from "./components/Firebase/firebase";
import firebaseContext from "./components/Firebase/context";

ReactDOM.render(
  <firebaseContext.Provider value={new Firebase()}>
    <App />
  </firebaseContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
