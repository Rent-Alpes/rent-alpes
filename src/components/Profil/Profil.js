import React, { useState, Fragment, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";

const Profil = (props) => {
  const firebase = useContext(firebaseContext);

  //Objet contenant toutes les données remplies
  const data = {
    lastName: "",
    firstName: "",
    email: "",
    phonenumber: "",
    address: "",
    postalcode: "",
    city: "",
    country: "",
    isAdmin: "",
  };

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState(data);
  const [orginalEmailData, setOrginalEmailData] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/login");
    });

    if (!!userSession) {
      firebase
        .user(userSession.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            const myData = doc.data();
            setUserData({ ...data, ...myData });
            setOrginalEmailData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      listener();
    };
  }, [userSession]);

  //Attribution de la value
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Si modif de l'email modifier dans Auth
    if (orginalEmailData.email !== userData.email) {
      var user = firebase.auth.currentUser;
      user
        .updateEmail(userData.email)
        .then()
        .catch(function (error) {
          console.log(error);
        });
    }

    firebase
      .user(userSession.uid)
      .set(userData)
      .catch((errordb) => {
        console.log(errordb);
      });
  };

  function deleteUser() {
    var user = firebase.auth.currentUser;
    //delete auth
    user
      .delete()
      .then(function () {
        //delete users
        firebase.user(userSession.uid).delete();
      })
      .catch(function (error) {
        console.log(error);
      });

    

  }

  return userSession === null ? (
    <Fragment>
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-50 opacity-75 flex flex-col items-center justify-center">
        <div className="loader"></div>
        <h2 className="text-center text-gray text-xl font-semibold">
          Loading...
        </h2>
        <p className="w-1/3 text-center text-gray">
          This may take a few seconds, please don't close this page.
        </p>
      </div>
    </Fragment>
  ) : (
    <div>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Profil</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                defaultValue=""
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                defaultValue={userData.lastName}
                onChange={handleChange}
              />

              <input
                type="text"
                defaultValue=""
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                defaultValue={userData.firstName}
                onChange={handleChange}
              />

              <input
                type="email"
                defaultValue=""
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                id="email"
                placeholder="Email"
                defaultValue={userData.email}
                onChange={handleChange}
              />

              <input
                type="tel"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phone number"
                defaultValue={userData.phonenumber}
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="address"
                id="address"
                placeholder="Address"
                defaultValue={userData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="postalcode"
                id="postalcode"
                placeholder="Postal Code"
                defaultValue={userData.postalcode}
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="city"
                id="city"
                placeholder="City"
                defaultValue={userData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="country"
                id="country"
                placeholder="Country"
                defaultValue={userData.country}
                onChange={handleChange}
              />

              <button className="w-full focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg">
                UPDATE INFOS
              </button>

              <>
                <button
                  className="w-full focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-red-500 hover:bg-red-600 hover:shadow-lg"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  DELETE ACCOUNT
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
                                  Delete account
                                </h3>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Are you sure you want to delete your
                                    account? All of your data will be
                                    permanently removed. This action cannot be
                                    undone.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                              type="button"
                              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                              onClick={deleteUser}
                            >
                              Delete
                            </button>
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
              </>
            </form>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Profil;
