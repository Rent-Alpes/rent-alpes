import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import GetDataList from "./GetDataProperty";
import app from "firebase/app";
import { Link } from "react-router-dom";

const EditProperty = (props) => {
  const firebase = useContext(firebaseContext);
  const db = app.firestore();
  const propertyId = window.location.href.split("/")[4];
  //console.log(propertyId);
  /*const PropertyValues = {
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
   
  };*/

  

  function getPropertyData() {
    var docRef = db.collection("Property").doc(propertyId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setpropertyData(doc.data());
        //  console.log(propertyData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  const [userSession, setUserSession] = useState(null);
  const [propertyData, setpropertyData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/login");
      if (!!userSession) {
      getPropertyData();
     // console.log(propertyData);
      }
    });

    return () => {
      listener();
    };
  }, [userSession]);

  const handleInputChange = (e) => {
    setpropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };


  function UpdateProperty() {
    const ref=db.collection('Property').doc(propertyId);
    ref.update({...propertyData});
    alert("Update property success !");
    <GetDataList/>
  
 
}
function deleteProperty() {
    db.collection('Property').doc(propertyId).delete();
 
alert("Delete property success !");
 <GetDataList/>
  
 
}

  return (
    <>
      <div className="min-h-screen bg-gray-200 p-0 sm:p-15 w-full h-screen overflow-hidden flex"
      style={{backgroundImage:`url(" https://images2.alphacoders.com/238/thumb-1920-238870.jpg")`}} >
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl h-5/6 my-auto" >
        
          <h1 className="text-2xl font-bold mb-8">Update your Property</h1>
          {propertyData && (
            <form id="form" className="overflow-auto my-auto px-6"  style={{height:"92%"}}>
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

              <Link to={{pathname: `/getdataproperty`}}>
              <div className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-yellow-600 hover:shadow-lg focus:outline-none flex justify-center"onClick={UpdateProperty} >
               <span>Update</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokelinecap="round" strokelinejoin="round"  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
</svg>
</div>
              </Link>


              <button
                  className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-700 hover:bg-red-600 hover:shadow-lg focus:outline-none flex justify-center" onClick={deleteProperty}   
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  
                  <span >Delete</span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1" viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
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
                                    Are you sure you want to delete your
                                    property ? All of your data will be
                                    permanently removed. This action cannot be
                                    undone.
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
                              to={{pathname: `/getdataproperty`}}
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
