import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5B7ow-4eqrf5_pmB0hiq34i2j3MHyMl4",
  authDomain: "rent-alpes-6b66d.firebaseapp.com",
  projectId: "rent-alpes-6b66d",
  storageBucket: "rent-alpes-6b66d.appspot.com",
  messagingSenderId: "851241372390",
  appId: "1:851241372390:web:4ba71e6e3ef5fedec60927",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
