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
