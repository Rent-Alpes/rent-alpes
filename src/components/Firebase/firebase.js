import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyB5B7ow-4eqrf5_pmB0hiq34i2j3MHyMl4",
  authDomain: "rent-alpes-6b66d.firebaseapp.com",
  projectId: "rent-alpes-6b66d",
  storageBucket: "rent-alpes-6b66d.appspot.com",
  messagingSenderId: "851241372390",
  appId: "1:851241372390:web:4ba71e6e3ef5fedec60927",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  // Inscription
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // Connexion
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // Deconnexion
  signOutUser = () => this.auth.signOut();

  user = (uid) => this.db.doc(`Users/${uid}`);
}

export default Firebase;
