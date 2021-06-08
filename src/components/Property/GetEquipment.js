import React, { useState, useEffect, useContext } from "react";
import app from "firebase/app";
import { firebaseContext } from "../Firebase";



const GetEquipment = () => {
  const db = app.firestore();
  const [Equipmentlist, setEquipmentlist] = useState([]);
  const firebase = useContext(firebaseContext);
  

  useEffect(() => {
    firebase.auth.onAuthStateChanged(() => {
      
      GetData();
    });
  },[]);

  const GetData = async () => {
    const response = db.collection("Equipments").doc('a9a9rYvheUhTkUZNi0A6');
    const items = await response.get();
    setEquipmentlist(items.data());
  };

  
  console.log(Equipmentlist);


  return(
    
    <div className="flex flex-col">




                    <div className="text-base font-medium text-gray-900" >
                   
                  </div>

                 



  </div>
    
  )



}


  export default GetEquipment;