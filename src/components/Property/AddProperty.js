import React, { useState, useContext } from "react";
import { firebaseContext } from "../Firebase";
import app from "firebase/app";
import InputAutocompletteAdress from "./Address/InputAutocompletteAdress";
import { InputFileChange } from "../InputFile/InputFile";
import { InputFileDelete } from "../InputFile/InputFile";
import Equipment from "./GetEquipment";
import { GetFile } from "../InputFile/InputFile";
import { Link } from "react-router-dom";
import Alerts from "./Alert";


export const UploadFiles = (id) => {
  var files = GetFile();
  for (var i = 0; files.length > i; i++) {
    var picture = app
      .storage()
      .ref("image/property/" + id)
      .child(files[i].name);
    picture.put(files[i]);
  }
};

const AddProperty = (props) => {
  const firebase = useContext(firebaseContext);
  const [Equipmentlist, setEquipmentlist] = useState([]);
  const [propertyValues, setPropertyValues] = useState();
  const [address, setAddress] = useState([]);
 
function add(){
  var user = firebase.auth.currentUser;
    
  propertyValues.idUser = user.uid;
  propertyValues.equipments=Equipmentlist; 
  props.addOrEditProperty(propertyValues);
}
  //console.log(Equipmentlist);
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      var user = firebase.auth.currentUser;
    
      propertyValues.idUser = user.uid;
      propertyValues.equipments=Equipmentlist; 
      props.addOrEditProperty(propertyValues);

      
    } catch {
      alert("Error add property");
    }
  };
  const handleInputChange = (e) => {
    setPropertyValues({ ...propertyValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="w-full h-screen bg-home h-full bg-no-repeat bg-cover bg-center overflow-hidden flex"
        style={{
          backgroundImage: `url("https://images7.alphacoders.com/594/thumb-1920-594150.jpg")`,
        }}
      >
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl h-5/6 my-auto">
          <h1 className="text-2xl font-bold mb-8">Create a Property</h1>
          <form
            id="form"
            onSubmit={handleSubmit}
            className="overflow-auto  my-auto px-6"
            style={{ height: "90%" }}
          >
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
            <InputAutocompletteAdress
              state={{ address: [address, setAddress] }}
         
            />

            <label className=" mb-5">Address</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="address"
                required
                onChange={handleInputChange}
                value={
                  address.length !== 0
                    ? address.raw.address.houseNumber +
                      " " +
                      address.raw.address.street
                    : ""
                }
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
                value={
                  address.length !== 0 ? address.raw.address.postalCode : ""
                }
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
                value={address.length !== 0 ? address.raw.address.city : ""}
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
                value={
                  address.length !== 0 ? address.raw.address.countryName : ""
                }
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Equipment</label>
            <div className="relative z-0 w-full mb-5">
              <div name="equipments" onChange={handleInputChange}>
                <Equipment
                  Equipmentlist={Equipmentlist}
                  setEquipmentlist={setEquipmentlist}
                />
              </div>
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
            <label>Price / night</label>
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

            <div>
              <div className="mt-5 text-center">
                <label
                  htmlFor="property-images"
                  className="btn flex justify-center border-2 rounded-lg p-3 text-2xl cursor-pointer hover:border-0 hover:bg-gray-300"
                >
                  + Add pictures
                </label>
                <input
                  type="file"
                  name="property-images"
                  onChange={InputFileChange}
                  accept=".JPG, .png, .jpeg, .png"
                  id="property-images"
                  max-size="20000"
                  multiple
                  style={{ visibility: "hidden" }}
                />
              </div>
              <div id="filesList"> </div>
            </div>
            <Alerts > </Alerts>
       
          </form>
            
        </div>
      </div>
    </>
  );
};
export default AddProperty;
