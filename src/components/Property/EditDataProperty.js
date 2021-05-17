import React, { useState, useContext, useEffect } from 'react'
import { firebaseContext } from '../Firebase';


const EditProperty = (props) => {

  const firebase = useContext(firebaseContext);
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState(PropertyValues);
  const PropertyValues = {
    name: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    bathroom: "",
    description: "",
    equipments: "",
    room: "",
    traveler: "",
    picture:"",
    idUser:"",
    price:"",
    thumb:"",
    surface:"",
  };

 
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
        
      </div>
    </>
  );

   
 
}


export default EditProperty;
