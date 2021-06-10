import React, { useState, useEffect, useContext } from "react";
import { firebaseContext } from '../Firebase';
import app from 'firebase/app';
import InputAutocompletteAdress from './Address/InputAutocompletteAdress';
import { InputFileChange } from '../InputFile/InputFile';
import { InputFileDelete } from '../InputFile/InputFile';
import { GetFile } from '../InputFile/InputFile';

export const UploadFiles = (id) => {
  var files = GetFile();
  for (var i = 0; files.length > i; i++) {
    var picture = app.storage().ref("image/property/" + id).child(files[i].name);
    picture.put(files[i]);
  }
}



const AddProperty = (props) => {
  const firebase = useContext(firebaseContext);
  const initialPropertyValues = {
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
    picture: "",
    idUser: "",
    price: "",
    thumb: "",
    surface: "",
  };
  const [userSession, setUserSession] = useState(null);
  const [error,setError]=useState("");
  const adresse =  <InputAutocompletteAdress /> 
  initialPropertyValues.address=adresse;

  const [propertyValues, setPropertyValues] = useState();

  const handleSubmit = (e) => {

    try{
    e.preventDefault();
    
    var user = firebase.auth.currentUser;
    propertyValues.idUser = user.uid;
    props.addOrEditProperty(propertyValues);
    alert ("Your property has been success add  !!");
    }
    catch {

    alert("Error add property");
  }
}
  const handleInputChange = (e) => {

    setPropertyValues({ ...propertyValues, [e.target.name]: e.target.value });

  };
  return (
    <>
      <div className="w-full h-screen bg-home h-full bg-no-repeat bg-cover bg-center overflow-hidden flex" 
      style={{backgroundImage:`url("https://images7.alphacoders.com/594/thumb-1920-594150.jpg")`}}>

        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl h-5/6 my-auto" style={{width:"500px"}}>
          <h1 className="text-2xl font-bold mb-8">Create a Property</h1>
          <form id="form" onSubmit={handleSubmit} className="overflow-auto  my-auto px-6" style={{height:"90%"}}>
          <label>Name</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
              
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <InputAutocompletteAdress />
            <label>Address</label>
            <div className="relative z-0 w-full mb-5" InputAutocompletteAdress>
              <input
                type="text"
                name="address"
                
                
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Postal Code</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="postalCode"
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>City</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="city"
                required
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Country</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="country"
                
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Bathroom</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="bathroom"
               
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Room</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="room"
               
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Traveler</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="traveler"
               required
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <label>Description</label>
            <div className="relative z-0 w-full mb-5">
              <textarea
                name="description"
                cols="40"
                rows="5"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Surface</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="surface"
                required 
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Price</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="price"
                placeholder="Price / Night"
                required
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Thumb</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="thumb"
               required
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="mt-5 mb-5">
                  <div className="text-center">
                    <label htmlFor="property-images" className="btn flex justify-center border-2 rounded-lg p-3 text-2l cursor-pointer hover:border-0 hover:bg-gray-300">+ Add picture</label>
                    <input className="hidden" type="file" name="property-images" onChange={InputFileChange} accept=".JPG, .png, .jpeg, .png" id="property-images" max-size="20000" multiple />
                  </div>
                  <div id="filesList"> </div>
                </div>
            <button
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-3  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-700 hover:bg-blue-700 hover:shadow-lg focus:outline-none flex justify-center">
              Add Property
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProperty;
