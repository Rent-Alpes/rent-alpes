import React, { useState, useContext, useEffect } from 'react'
import { firebaseContext } from '../Firebase';
import idprops from '../Property/GetDataProperty';



const EditProperty = (props) => {

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
    picture:"",
    idUser:"",
    price:"",
    thumb:"",
    surface:"",
    idDocument:"",
  };

  function getIdproperty(id) {
    console.log(id);
    
  }

  console.log(props.idproperty);
  getIdproperty(idprops.idDocument);
  const [userSession, setUserSession] = useState(null);
  const [propertyData, setpropertyData] = useState(PropertyValues);
  

  useEffect(() => {
      let listener = firebase.auth.onAuthStateChanged(user => {
          user ? setUserSession(user) : props.history.push('/login')
      })

     

    /*  if (!!userSession) {
          firebase.addOrEdit(PropertyValues).get()
              .then(doc => {
                  if (doc && doc.exists) {
                      //const myData = doc.data();
                      setpropertyData({ ...PropertyValues});
                  }
              })
              .catch(error => {
                  console.log(error);
              })
      }*/

      return () => {
          listener()
      };
  }, [userSession]);



  const handleInputChange = (e) => {
    setpropertyData({ ...propertyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  var propertys=  firebase.firestore().collection("Property").then().doc(PropertyValues.idDocument);
  console.log(propertys);

    //props.addOrEditProperty(PropertyValues);
      /*    var user = firebase.property.uid;
          user.updateProperty(propertyData.name,
            propertyData.address,
            propertyData.postalCode,
            propertyData.city,
            propertyData.country,
            propertyData.bathroom,
            propertyData.description,
            propertyData.equipments,
            propertyData.room,
            propertyData.traveler,
            propertyData.picture,
            propertyData.idUser,
            propertyData.price,
            propertyData.thumb,
            propertyData.surface

            ).then(function () {
              console.log("Success modification");
          }).catch(function (error) {
              console.log(error);
          });

      firebase.property(userSession.uid).set(
        propertyData,
        console.log(propertyData)
      )
          .catch(errordb => {
              console.log(errordb)
          })*/


  }
   function deleteUser() {
        var property = firebase.firestore().collection("Property").doc(PropertyValues.idDocument);
        //delete auth
        
        property.delete().then(function () {

            console.log("Success deletion");
        }).catch(function (error) {
            console.log(error);
        });

        //delete users
        firebase.property(propertyData.uid).delete();

    }
  

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
                defaultValue={props.propertyData.name}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="address"
                placeholder="Address"
                defaultValue={propertyData.address}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                defaultValue={propertyData.postalCode}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="city"
                placeholder="City"
                defaultValue={propertyData.city}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="country"
                placeholder="Country"
                defaultValue={propertyData.country}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="bathroom"
                placeholder="Number of Bathroom"
                defaultValue={propertyData.bathroom}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="room"
                placeholder="Number of Room"
                defaultValue={propertyData.room}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="traveler"
                placeholder="Number of Traveler"
                defaultValue={propertyData.traveler}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>


            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={propertyData.description}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
         
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="surface"
                placeholder="Surface"
                defaultValue={propertyData.surface}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="price"
                placeholder="Price / Night"
                defaultValue={propertyData.price}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="thumb"
                placeholder="Thumb"
                defaultValue={propertyData.thumb}
                onChange={handleInputChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
            </div>
        
            <div>
                    <label className="block text-sm font-medium text-gray-700">Edit picture of property</label>
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
                  
                            <input multiple type="file" name="picture" accept="image/png,image/jpg,image/jpeg"   />
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

            <button  className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg" >
                   Delete property 
              </button>
          </form>
        </div>
      </div>
    </>
  );
 
}


export default EditProperty;
