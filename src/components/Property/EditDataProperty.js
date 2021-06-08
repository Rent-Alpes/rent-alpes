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

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/login");
      getPropertyData();
     // console.log(propertyData);
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
  if (!!propertyId  ){
alert("Delete property success !");
 <GetDataList/>
  }
 
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
  <path stroke-linecap="round" stroke-linejoin="round"  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
</svg>
</div>
              </Link>


              <Link className="text-center " to={{pathname: `/getdataproperty`}}  >
              
                  <div className="w-full px-2 py-2 mt-2 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-700 hover:bg-red-600 hover:shadow-lg focus:outline-none flex justify-center" onClick={deleteProperty}    >
                  <span >Delete</span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pl-1" viewBox="0 0 24 24" fill="currentColor">
  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
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
