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
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");


  const [propertyValues, setPropertyValues] = useState(initialPropertyValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = firebase.auth.currentUser;
    propertyValues.idUser = user.uid;
    props.addOrEditProperty(propertyValues);
    alert("Your property has been success add  !!");

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
                type="number"
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
              <div className="mt-5 text-center">
                <label htmlFor="property-images" className="btn flex justify-center border-2 rounded-lg p-3 text-2xl cursor-pointer hover:border-0 hover:bg-gray-300">+ Add</label>
                <input type="file" name="property-images" onChange={InputFileChange} accept=".JPG, .png, .jpeg, .png" id="property-images" max-size="20000" multiple style={{ visibility: "hidden" }} />
              </div>
              <div id="filesList"> </div>
            </div>
            <button
              id="button"
              type="submit"
              className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-700 hover:bg-blue-700 hover:shadow-lg focus:outline-none">
              Register Property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProperty;
