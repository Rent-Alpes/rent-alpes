import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import app from "firebase/app";
import { Link } from "react-router-dom";
import { SetInputFile } from "../InputFile/InputFile";
import { InputFileChange } from "../InputFile/InputFile";
import { UpdateAlgolia } from "../Algolia/Algolia";
import { DeleteAlgolia } from "../Algolia/Algolia";
import { useHistory } from "react-router-dom";
import Equipment from "./GetEquipment";

const EditProperty = () => {
  const firebase = useContext(firebaseContext);
  const db = app.firestore();
  const propertyId = window.location.href.split("/")[4];
  let history = useHistory();

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : history.push("/login");
      if (!userSession) {
        getPropertyData();
      }
    });
    SetImageInput(propertyId);
  }, [userSession]);

  function getPropertyData() {
    var docRef = db.collection("Property").doc(propertyId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setpropertyData(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const [Equipmentlist, setEquipmentlist] = useState([]);
  const [userSession, setUserSession] = useState(null);
  const [propertyData, setpropertyData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const handleInputChange = (e) => {
    setpropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  function UpdateProperty() {
    try {
      setShowModalUpdate(false);
      const ref = db.collection("Property").doc(propertyId);
      ref.update({ ...propertyData, equipments: Equipmentlist });
      UpdateAlgolia(propertyData, propertyId);
    } catch {
      alert("error");
    }
  }
  function deleteProperty() {
    try {
      db.collection("Property").doc(propertyId).delete();

      if (!!propertyId) {
        // alert("Delete property success !");

        deleteFiles();
        DeleteAlgolia(propertyId);
      }
    } catch {
      alert("error");
    }
  }
  const deleteFiles = async () => {
    var picture = await app.storage().ref("image/property");
    picture
      .child(propertyId)
      .listAll()
      .then((res) => {
        res.items.forEach((folderRef) => {
          folderRef
            .delete()
            .then(() => {})
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SetImageInput = async () => {
    var picture = await app.storage().ref("image/property");
    picture
      .child(propertyId)
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          itemRef
            .getMetadata()
            .then((metadata) => {
              var file = new File([null], metadata.name, {
                type: metadata.contentType,
              });
              SetInputFile(file, propertyId);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputFileChange = () => {
    InputFileChange(propertyId);
  };

  return (
    <>
      <div
        className="min-h-screen bg-gray-200 p-0 sm:p-15 w-full h-screen overflow-hidden flex"
        style={{
          backgroundImage: `url(" https://images2.alphacoders.com/238/thumb-1920-238870.jpg")`,
        }}
      >
        <div
          className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl h-5/6 my-auto"
          style={{ width: "450px" }}
        >
          <h1 className="text-2xl font-bold mb-8">Update your Property</h1>
          {propertyData && (
            <form
              id="form"
              className="overflow-auto my-auto px-6"
              style={{ height: "92%" }}
            >
              <div className="relative z-0 w-full mb-5">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  maxLength={50}
                  defaultValue={propertyData.name}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  maxLength={50}
                  defaultValue={propertyData.address}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  maxLength={50}
                  defaultValue={propertyData.postalCode}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  maxLength={50}
                  defaultValue={propertyData.city}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>

              <div className="relative z-0 w-full mb-5">
                <label>Equipments</label>
                <Equipment
                  name="equipments"
                  Equipmentlist={propertyData.equipments}
                  setEquipmentlist={setEquipmentlist}
                />
              </div>

              <div className="relative z-0 w-full mb-5">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  maxLength={50}
                  defaultValue={propertyData.country}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Bathroom</label>
                <input
                  type="number"
                  name="bathroom"
                  defaultValue={propertyData.bathroom}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Room</label>
                <input
                  type="number"
                  name="room"
                  defaultValue={propertyData.room}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Traveler</label>
                <input
                  type="number"
                  name="traveler"
                  defaultValue={propertyData.traveler}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Description</label>
                <textarea
                  name="description"
                  maxLength={2000}
                  rows={5}
                  cols={5}
                  defaultValue={propertyData.description}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Surface</label>
                <input
                  type="number"
                  name="surface"
                  defaultValue={propertyData.surface}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={propertyData.price}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Thumb</label>
                <input
                  type="text"
                  name="thumb"
                  defaultValue={propertyData.thumb}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edit picture of property
                </label>
                <div className="mt-5 mb-5">
                  <div className="text-center">
                    <label
                      htmlFor="property-images"
                      className="btn flex justify-center border-2 rounded-lg p-3 text-2l cursor-pointer hover:border-0 hover:bg-gray-300"
                    >
                      + Add picture
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      name="property-images"
                      onChange={handleInputFileChange}
                      accept=".JPG, .png, .jpeg, .png"
                      id="property-images"
                      max-size="20000"
                      multiple
                    />
                  </div>
                  <div id="filesList"> </div>
                </div>
              </div>

              <button
                className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-yellow-600 hover:shadow-lg focus:outline-none flex justify-center"
                type="button"
                onClick={() => setShowModalUpdate(true)}
              >
                <span>Update</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 pl-1 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              {showModalUpdate ? (
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
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="#23682F"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
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
                                  Successful change !
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <Link
                            type="button"
                            to={{ pathname: `/getDataProperty` }}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={UpdateProperty}
                          >
                            Ok
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
              <button
                className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-700 hover:bg-red-600 hover:shadow-lg focus:outline-none flex justify-center"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <span>Delete</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 pl-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
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
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                              <svg
                                className="h-6 w-6 text-red-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                              </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900"
                                id="modal-title"
                              >
                                Delete Property
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to delete your property
                                  ? All of your data will be permanently
                                  removed. This action cannot be undone.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <Link
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={deleteProperty}
                            to={{ pathname: `/getdataproperty` }}
                          >
                            Comfirm delete
                          </Link>
                          <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProperty;
