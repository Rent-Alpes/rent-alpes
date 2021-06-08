import React, { useState, useContext } from "react";
import { firebaseContext } from "../Firebase";

const PropertyForm = (props) => {
  const firebase = useContext(firebaseContext);
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
    picture: "",
    idUser: "",
    price: "",
    thumb: "",
    surface: "",
    idDocument: "",
  };
  const [propertyData, setpropertyData] = useState(PropertyValues);
  const handleInputChange = (e) => {
    setpropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var propertys = firebase
      .firestore()
      .collection("Property")
      .then()
      .doc(PropertyValues.idDocument);
    console.log(propertys);

  
  };

  return (
    <>
      <div className="min-h-screen bg-gray-200 p-0 sm:p-12">
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Update your Property</h1>
          <form id="form" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={props.propertyId.name}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="address"
                placeholder="Address"
                defaultValue={props.propertyId.address}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                defaultValue={props.propertyId.postalCode}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={props.propertyId.city}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="country"
                placeholder="Country"
                defaultValue={props.propertyId.country}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="bathroom"
                placeholder="Number of Bathroom"
                defaultValue={props.propertyId.bathroom}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="room"
                placeholder="Number of Room"
                defaultValue={props.propertyId.room}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="traveler"
                placeholder="Number of Traveler"
                defaultValue={props.propertyId.traveler}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={props.propertyId.description}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="surface"
                placeholder="Surface"
                defaultValue={props.propertyId.surface}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="price"
                placeholder="Price / Night"
                defaultValue={props.propertyId.price}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="thumb"
                placeholder="Thumb"
                defaultValue={props.propertyId.thumb}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Edit picture of property
              </label>
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
                      <input
                        multiple
                        type="file"
                        name="picture"
                        accept="image/png,image/jpg,image/jpeg"
                      />
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
              UpdateProperty
            </button>

            <button className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg">
              Delete property
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PropertyForm;
