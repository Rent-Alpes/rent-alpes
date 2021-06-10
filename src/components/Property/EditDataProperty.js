import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import GetDataList from "./GetDataProperty";
import app from "firebase/app";
import { Link } from "react-router-dom";
import { SetInputFile } from '../InputFile/InputFile';
import { InputFileChange } from '../InputFile/InputFile';
import { UpdateAlgolia } from '../Algolia/Algolia';
import { DeleteAlgolia } from '../Algolia/Algolia';


const EditProperty = (props) => {
  const firebase = useContext(firebaseContext);
  const db = app.firestore();
  const propertyId = window.location.href.split("/")[4];

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

  const [userSession, setUserSession] = useState(null);
  const [propertyData, setpropertyData] = useState(null);

  useEffect(() => {
    //let listener = firebase.auth.onAuthStateChanged((user) => {
    firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/login");
      getPropertyData();
    });
    SetImageInput(propertyId);
  }, []);
  //   return () => {
  //     listener();
  //   };
  // }, [userSession]);

  const handleInputChange = (e) => {
    setpropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  function UpdateProperty() {
    const ref = db.collection("Property").doc(propertyId);
    ref.update({ ...propertyData });
    alert("Update property success !");
    <GetDataList />
    UpdateAlgolia(propertyData,propertyId);
  }
  function deleteProperty() {
    db.collection('Property').doc(propertyId).delete();
    if (!!propertyId) {
      alert("Delete property success !");
      <GetDataList />
      deleteFiles();
      DeleteAlgolia(propertyId);
    }

  }
  const deleteFiles = async()=>{
    var picture = await app.storage().ref("image/property");
    picture.child(propertyId).listAll().then((res) => {
      res.items.forEach((folderRef) => {
        folderRef.delete().then(() => {
        }).catch((error) => {
          console.log(error);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  const SetImageInput = async () => {
    var picture = await app.storage().ref("image/property");
    picture.child(propertyId).listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getMetadata().then((metadata) => {
          var file = new File([null], metadata.name, { type: metadata.contentType });
          SetInputFile(file, propertyId);
        }).catch((error) => {
          console.log(error);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleInputFileChange = () => {
    InputFileChange(propertyId);
  }

  return (
    <>
      <div
        className="min-h-screen bg-gray-200 p-0 sm:p-15 w-full h-screen overflow-hidden flex"
        style={{
          backgroundImage: `url(" https://images2.alphacoders.com/238/thumb-1920-238870.jpg")`,
        }}
      >
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl h-5/6 my-auto">
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
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  maxLength={50}
                  defaultValue={propertyData.address}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  maxLength={50}
                  defaultValue={propertyData.postalCode}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  maxLength={50}
                  defaultValue={propertyData.city}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
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
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Room</label>
                <input
                  type="number"
                  name="room"
                  defaultValue={propertyData.room}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Traveler</label>
                <input
                  type="number"
                  name="traveler"
                  defaultValue={propertyData.traveler}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
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
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Surface</label>
                <input
                  type="number"
                  name="surface"
                  defaultValue={propertyData.surface}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={propertyData.price}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div className="relative z-0 w-full mb-5">
                <label>Thumb</label>
                <input
                  type="text"
                  name="thumb"
                  defaultValue={propertyData.thumb}
                  onChange={handleInputChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Edit picture of property</label>
                <div className="mt-5 mb-5">
                  <div className="text-center">
                    <label htmlFor="property-images" className="btn flex justify-center border-2 rounded-lg p-3 text-2l cursor-pointer hover:border-0 hover:bg-gray-300">+ Add picture</label>
                    <input className="hidden" type="file" name="property-images" onChange={handleInputFileChange} accept=".JPG, .png, .jpeg, .png" id="property-images" max-size="20000" multiple />
                  </div>
                  <div id="filesList"> </div>
                </div>
              </div>
              <Link to={{ pathname: `/getdataproperty` }}>
                <div className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-yellow-600 hover:shadow-lg focus:outline-none flex justify-center" onClick={UpdateProperty} >
                  <span>Update</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </Link>
              <Link className="text-center " to={{ pathname: `/getdataproperty` }}>
                <div className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-700 hover:bg-red-600 hover:shadow-lg focus:outline-none flex justify-center" onClick={deleteProperty}    >
                  <span >Delete</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProperty;
