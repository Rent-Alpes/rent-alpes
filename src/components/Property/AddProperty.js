import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import app from "firebase/app";
import InputAutocompletteAdress from "./Address/InputAutocompletteAdress";
import { InputFileChange } from "../InputFile/InputFile";
import Equipment from "./GetEquipment";
import { GetFile } from "../InputFile/InputFile";
import { useHistory } from "react-router-dom";



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
  const [showModal, setShowModal] = useState(false);
  const [showModalErreur, setShowModalErreur] = useState(false);
  const [userSession, setUserSession] = useState(null);
  let history = useHistory();

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : history.push("/login");
      if (!userSession) {
      }
    });

  }, [userSession]);

 function push(){
   setShowModal(false);
    history.push('/getDataProperty');
  }


  const handleSubmit=(e)=>{
    e.preventDefault();
    try {


      var user = firebase.auth.currentUser;
      propertyValues.idUser = user.uid;
      propertyValues.equipments = Equipmentlist;
      propertyValues.address = e.target[2].value;
      propertyValues.postalCode = e.target[3].value;
      propertyValues.city = e.target[4].value;
      propertyValues.country = e.target[5].value;
      propertyValues.position = new app.firestore.GeoPoint(
          address.position.lat,
          address.position.lng
      );

      props.addOrEditProperty(propertyValues);
      setShowModal(true);



    } catch {
      setShowModalErreur(true);
    }
  }

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
                value={address.length !== 0 ? address.address.city : ""}
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
                value={address.length !== 0 ? address.address.countryName : ""}
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
                required
                min="0"
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
                min="0"
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
                min="0"
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
                min="0"
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
                min="0"
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <label>Thumb</label>
            <div className="relative z-0 w-full mb-5">
              <input
                type="url"
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
            <button id="button" type="submit" className="w-full px-6 py-3 mt-3  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-green-700 hover:bg-blue-700 hover:shadow-lg focus:outline-none flex justify-center" >

              <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Property

          </button>

          {showModal ? (
                <>
         <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                      ></div>

                      <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                      >
                        &#8203;
                      </span>

                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#318959 ">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
</svg>

                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                              >
                                Success
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Your property has been success add !
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={push}
                          >
                            Ok
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>

            </>
              ) : null}

{showModalErreur ? (
                <>
         <div
                    className="fixed z-10 inset-0 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                  >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                      <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                      ></div>

                      <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                      >
                        &#8203;
                      </span>

                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#893131">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                              >
                                Error
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                Registration error, please try again or contact the administrator !
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setShowModalErreur(false)}

                          >

                            Ok
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>

            </>
              ) : null}
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProperty;
