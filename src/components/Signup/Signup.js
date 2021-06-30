import React, { useState, useContext } from "react";
import { firebaseContext } from "../Firebase";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import HeaderDark from "../HeaderDark/HeaderDark";

const Signup = () => {
  const firebase = useContext(firebaseContext);

  //Objet contenant toutes les données remplies
  const data = {
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
    phonenumber: "",
    address: "",
    postalcode: "",
    city: "",
    country: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [errordb, setErrorDB] = useState("");
  const [showModal, setShowModal] = useState(false);

  //Attribution de la value
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorDB("");
    //destructuring
    const {
      email,
      password,
      firstName,
      lastName,
      isAdmin,
      phonenumber,
      address,
      postalcode,
      city,
      country,
    } = loginData;

    if (errorMsg === "") {
      firebase
        .signupUser(email, password)
        .then((authUser) => {
          return firebase.user(authUser.user.uid).set({
            firstName,
            lastName,
            email,
            isAdmin,
            phonenumber,
            address,
            postalcode,
            city,
            country,
          });
        })
        .then(() => {
          setLoginData({ ...data });
          setShowModal(true);
        })
        
        .catch((errordb) => {
          document.getElementById("spanErrorMessage").innerHTML = ""; //Effacer le message d'erreur si erreur base
          setErrorDB(errordb);
          setLoginData({ ...data });
        });
    }
    
  };

  //destructuring (epeche de voir le loginData)
  const { lastName, firstName, email, password, confirmPassword } = loginData;

  //Gestion Erreurs
  var errorMsg = "";
  function verifyData() {
    if (
      lastName === "" &&
      firstName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      errorMsg = "Please fill out the form";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (lastName === "") {
      errorMsg = "Please enter your last name";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (firstName === "") {
      errorMsg = "Please enter your first name";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (email === "") {
      errorMsg = "Please enter your email";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (password === "") {
      errorMsg = "Please enter your password";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (confirmPassword === "") {
      errorMsg = "Please confirm your password";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (password !== confirmPassword) {
      errorMsg = "Passwords do not match";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    }
  }

  const errorMsgDB = errordb !== "" && (
    <label className="red-text">{errordb.message}</label>
  );

  return (
    <>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
              />

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleChange}
              />

              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleChange}
              />

              <p className="red-text">
                <span id="spanErrorMessage"></span>
              </p>
              {errorMsgDB}

              <button
                onClick={verifyData}
                className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg"
              >
                SIGN UP
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
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="#0D42DC">
  <path stroke-strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                                  Your profile has been Add  !
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={() => setShowModal(false)}
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

          <div className="text-grey-dark mt-6">
            Already have an account?
            <Link
              to="/login"
              className="no-underline border-b border-blue text-blue pl-1"
            >
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
