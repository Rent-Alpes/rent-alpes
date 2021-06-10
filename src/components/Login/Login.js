import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { firebaseContext } from "../Firebase";
import logo from "../../images/logo.png";

const Login = (props) => {
  const firebase = useContext(firebaseContext);

  //Objet contenant toutes les données remplies
  const data = {
    email: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(data);
  const [errordb, setErrorDB] = useState("");

  //Attribution de la value
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //destructuring
    const { email, password } = loginData;

    firebase
      .loginUser(email, password)
      .then((user) => {
        setLoginData({ ...data });
        props.history.push("/");
      })
      .catch((error) => {
        setErrorDB(error);
        setLoginData({ ...data });
      });
  };

  //destructuring (epeche de voir le loginData)
  const { email, password } = loginData;

  //Gestion des erreurs
  const errorMsgDB = errordb !== "" && (
    <label className="red-text">{errordb.message}</label>
  );

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded border text-black w-full">
            <h1 className="mb-8 text-3xl text-center"> Login </h1>
            <form onSubmit={handleSubmit}>
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
                className="block border border-grey-light w-full p-3 rounded "
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />

              <div className="text-grey-dark left text-right mb-4">
                <Link
                  to="/forgetpassword"
                  className="no-underline pl-1 text-xs"
                >
                  Forgot Password ?
                </Link>
              </div>

              {errorMsgDB}

              <button className="w-full focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg">
                LOGIN
              </button>
            </form>
          </div>

          <div className="text-grey-dark mt-6">
            You don't have an account ?
            <Link
              to="/signup"
              className="no-underline border-b border-blue text-blue pl-1"
            >
              Sign up
            </Link>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
