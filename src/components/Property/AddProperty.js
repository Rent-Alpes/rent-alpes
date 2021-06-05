import React, { useState,useEffect,useContext } from "react";
import {firebaseContext} from '../Firebase';
import app from 'firebase/app';
import InputAutocompletteAdress from './Address/InputAutocompletteAdress';

export const UploadFiles=(id)=>{
  //console.log(id);
return id;
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
    picture:"",
    idUser:"",
    price:"",
    thumb:"",
    surface:"",
  };
  const [user, setUser] = useState(null);
  const [error,setError]=useState("");

 

  const onFileChange = (e) => {
    //const users = firebase.auth.currentUser;
    const file = e.target.files[0];
    initialPropertyValues.picture=app.storage().ref("image/"+"Property/"+initialPropertyValues.picture).child(file.name);
    //initialPropertyValues.picture=app.storage().ref("image/property/"+file.name).child(users.uid);
    initialPropertyValues.picture.put(file);
    console.log(file);
    };


  const [propertyValues, setPropertyValues] = useState(initialPropertyValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = firebase.auth.currentUser;
    propertyValues.idUser=user.uid;
    props.addOrEditProperty(propertyValues);
    alert ("Your property has been success add  !!");

  };
 
  const handleInputChange = (e) => {
   
    setPropertyValues({ ...propertyValues, [e.target.name]: e.target.value });

  };

  return (
    <>
      <div className="min-h-screen bg-gray-200 p-0 sm:p-12">
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Create a Property</h1>
          <form id="form" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <InputAutocompletteAdress />

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="address"
                placeholder="Address"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="city"
                placeholder="City"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="country"
                placeholder="Country"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="bathroom"
                placeholder="Number of Bathroom"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="room"
                placeholder="Number of Room"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="traveler"
                placeholder="Number of Traveler"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>


            <div className="relative z-0 w-full mb-5">
              <textarea
                name="description"
                placeholder="Description"
                required pattern="[0-9a-zA-Z-\.]"
                cols="40"
                rows="5"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
         
            <div className="relative z-0 w-full mb-5">
              <input
                type="numer"
                name="surface"
                placeholder="Surface"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="number"
                name="price"
                placeholder="Price / Night"
                required pattern="[0-9a-zA-Z-\.]"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="thumb"
                placeholder="Thumb"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
        
            <div>
                    <label className="block text-sm font-medium text-gray-700">Add picture of property</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                  
                            <input multiple type="file" name="picture" accept="image/png,image/jpg,image/jpeg"  onChange={onFileChange} />
                          </label>
                     
                        </div>
                        
                      </div>
                 
                    </div>
                  </div>
                
                  
            <button
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-700 hover:bg-blue-700 hover:shadow-lg focus:outline-none"
             
            >
              Register Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProperty;
