import React from "react";
import Header from "../Header/Header";
import "../Error404/Error404.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <div className="min-w-screen min-h-screen bg-error">
        <Header />
        <div className="flex items-center justify-center overflow-hidden relative">
          <div className="p-5 lg:p-10 flex justify-center">
            <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
              <div className="w-full md:w-1/2">
                <div className="mb-10 md:mb-20 text-gray-600 font-light">
                  <h1 className="font-black uppercase text-3xl lg:text-5xl text-yellow-500 mb-10">
                    You seem to be lost!
                  </h1>
                  <p>
                    The page you're looking for isn't available or didn't exist.
                  </p>
                  <p>Try searching again or use the Go Back button below.</p>
                </div>
                <div className="mb-20 md:mb-0">
                  <Link to="/">
                    <button className="bg-transparent text-yellow-500 font-semibold py-2 px-4 border border-yellow-500 rounded shadow focus:outline-none transform transition-all hover:text-yellow-600 hover:border-yellow-600">
                      COME BACK HOME
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center">
                <img
                  src={logo}
                  className="object-contain"
                  alt="logo Rent'alpes"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
