import React, { useContext } from "react";
import firebaseContext from "../Firebase/context";

const Lougout = () => {
  const firebase = useContext(firebaseContext);

  function deconnectUser() {
    alert("Deconnexion réussie");
    firebase.signOutUser();
  }

  return (
    <div>
      <button
        onClick={deconnectUser}
        className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg"
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Lougout;
