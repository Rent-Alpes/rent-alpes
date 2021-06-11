import React, { useState, useEffect, useContext } from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import app from "firebase/app";
import Lougout from "../Logout/Logout";
import { firebaseContext } from "../Firebase";

//Menu
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const firebase = useContext(firebaseContext);

  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState(null);

  //Si connecté
  useEffect(() => {
    return app.auth().onAuthStateChanged((user) => {
      setUserSession(user);
      if (!user) {
        setUserData(null);
      } else {
        firebase
          .user(user.uid)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              const myData = doc.data();
              setUserData(myData);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [firebase]);

  return (
    <div>
      <div className="w-full h-32">
        <nav className="flex  fixed  top-0 items-center justify-between pt-3 px-3 w-full">
          <div className="flex w-6/12 text-white mr-6">
            <img
              src={logo}
              className="object-contain h-28"
              alt="logo Rent'alpes"
            ></img>
          </div>

          <div className="w-6/12 block flex-grow grid justify-items-stretch">
            <div className="flex justify-end">
              {/* //////////////////////////// FAVORITES //////////////////////////// */}
              {/*<button className="inline-block text-sm pl-4 mdrounded text-white mt-6 font-bold block text-center focus:outline-none">*/}
              {/*  <div className="flex justify-center">*/}
              {/*    <svg*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*      className="h-10 w-10"*/}
              {/*      fill="none"*/}
              {/*      viewBox="0 0 24 24"*/}
              {/*      stroke="currentColor"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*        strokeLinecap="round"*/}
              {/*        strokeLinejoin="round"*/}
              {/*        strokeWidth={2}*/}
              {/*        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"*/}
              {/*      />*/}
              {/*    </svg>*/}
              {/*  </div>*/}
              {/*  <span>*/}
              {/*    <span className="text-xs">FAVORITES</span>*/}
              {/*  </span>*/}
              {/*</button>*/}
              {/* /////////////////////////////////////////////////////////////// */}

              {/* //////////////////////////// ADD PROPERTY //////////////////////////// */}
              <Link to="/addproperty">
                <button className="inline-block text-sm pl-4 mdrounded text-white mt-6 font-bold block text-center focus:outline-none">
                  <div className="flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <span>
                    <span className="text-xs">BECOME HOST</span>
                  </span>
                </button>
              </Link>
              {/* /////////////////////////////////////////////////////////////// */}

              {/* //////////////////////////// ACCOUNT //////////////////////////// */}

              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="inline-block text-sm pl-4 mr-10 sm:mr-0 md:mr-10 xl:mr-10 mdrounded text-white mt-6 font-bold block text-center focus:outline-none">
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 self-end"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        <span>
                          <span className="text-xs">ACCOUNT</span>
                        </span>
                      </Menu.Button>
                    </div>

                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="origin-top-right absolute right-0 mt-2 w-28 mr-10 sm:mr-0 md:mr-10 xl:mr-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {!userSession && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/signup"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Sign up
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          {!userSession && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/login"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Login
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          {userSession && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/profil"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Profile
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          {userSession && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/getDataProperty"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Property
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          {userData?.isAdmin && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  Administration
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          {userSession && (
                            <Menu.Item>{({ active }) => <Lougout />}</Menu.Item>
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
              {/* /////////////////////////////////////////////////////////////// */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
