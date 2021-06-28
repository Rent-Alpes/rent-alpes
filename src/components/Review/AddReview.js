import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import firebase from "firebase/app";

const AddReview = ({ propertyId }) => {
  const firebaseDB = useContext(firebaseContext);

  //Objet contenant toutes les données remplies
  const data = {
    title: "",
    comment: "",
    cleanless: "",
    location: "",
    equipments: "",
    averageRating: "",
    idUser: "",
  };

  //  CLEANLESS
  const [ratingCleanless, setRatingCleanless] = useState(null);
  const [hoverCleanless, setHoverCleanless] = useState(null);

  // Location
  const [ratingLocation, setRatingLocation] = useState(null);
  const [hoverLocation, setHoverLocation] = useState(null);

  // Equipment
  const [ratingEquipments, setRatingEquipments] = useState(null);
  const [hoverEquipments, setHoverEquipments] = useState(null);

  //Review
  const [reviewData, setReviewData] = useState(data);
  const [userSession, setUserSession] = useState(null);

  //Modal
  const [showModalAddReview, setShowModalAddReview] = useState(false);

  useEffect(() => {
    firebaseDB.auth.onAuthStateChanged((user) => {
      setUserSession(user);
    });
  }, [userSession]);

  //Attribution des values
  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.id]: e.target.value });
  };

  const { title, comment } = reviewData;

  //Gestion Erreurs
  var errorMsg = "";
  function verifyData() {
    if (ratingLocation === null) {
      errorMsg = "Please rate the location";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (ratingEquipments === null) {
      errorMsg = "Please rate the equipments";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (ratingCleanless === null) {
      errorMsg = "Please rate the cleanless";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (title === "" && comment === "") {
      errorMsg = "Please fill out the review";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (title === "") {
      errorMsg = "Please enter a title";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    } else if (comment === "") {
      errorMsg = "Please enter a comment";
      document.getElementById("spanErrorMessage").innerHTML = errorMsg;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errorMsg === "") {
      reviewData.cleanless = ratingCleanless;
      reviewData.equipments = ratingEquipments;
      reviewData.location = ratingLocation;
      reviewData.idUser = userSession.uid;

      //Calcule moyenne
      const averageRating =
        (reviewData.cleanless + reviewData.equipments + reviewData.location) /
        3;
      //Arrondir moyenne à la dizaine
      reviewData.averageRating = Number(averageRating.toFixed(1));
      const idProperty = propertyId;

      firebaseDB
        .review()
        .add(reviewData)
        .then((doc) =>
          firebaseDB
            .property()
            .doc(idProperty)
            .update({
              avis: firebaseDB.firebase.firestore.FieldValue.arrayUnion(doc.id),
            })
        );
      setShowModalAddReview(false);
    }
  };

  function handleClick() {
    setShowModalAddReview(true);
  }

  function close() {
    setShowModalAddReview(false);
  }

  return (
    <>
      <div>
        <button
          onClick={handleClick}
          className="focus:outline-none text-white text-sm mt-5 py-2 px-4 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg"
        >
          ADD REVIEW
        </button>
      </div>

      {showModalAddReview ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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

            <div className="w-2/5 inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
              <div
                onClick={close}
                className="flex justify-end text-white cursor-pointer"
              >
                <span>Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="bg-white w-full h-full justify-center items-center">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col w-full ">
                    <div className="flex flex-wrap flex-row">
                      <div className="flex flex-col xl:ml-2 sm:ml-5 w-full xl:w-40 md:w-40 sm:w-40">
                        {/* LOCATION */}
                        <p className="flex bold justify-center">Location</p>
                        <div className="flex flex-row justify-center xl:justify-start md:justify-start sm:justify-center">
                          {[...Array(5)].map((star, i) => {
                            const locationRatingValue = i + 1;
                            return (
                              <label key={i}>
                                <input
                                  type="radio"
                                  name="rating"
                                  className="hidden"
                                  value={locationRatingValue}
                                  onClick={() =>
                                    setRatingLocation(locationRatingValue)
                                  }
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 cursor-pointer star"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color={
                                    locationRatingValue <=
                                    (hoverLocation || ratingLocation)
                                      ? "#ffc107"
                                      : "#e4e5e9"
                                  }
                                  onMouseEnter={() =>
                                    setHoverLocation(locationRatingValue)
                                  }
                                  onMouseLeave={() => setHoverLocation(null)}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </label>
                            );
                          })}
                        </div>
                        <br />

                        {/* EQUIPMENTS */}
                        <p className="flex bold justify-center">Equipments</p>
                        <div className="flex flex-row justify-center xl:justify-start md:justify-start sm:justify-center ">
                          {[...Array(5)].map((star, i) => {
                            const equipmentsRatingValue = i + 1;
                            return (
                              <label key={i}>
                                <input
                                  type="radio"
                                  name="rating"
                                  className="hidden"
                                  value={equipmentsRatingValue}
                                  onClick={() =>
                                    setRatingEquipments(equipmentsRatingValue)
                                  }
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 cursor-pointer star"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color={
                                    equipmentsRatingValue <=
                                    (hoverEquipments || ratingEquipments)
                                      ? "#ffc107"
                                      : "#e4e5e9"
                                  }
                                  onMouseEnter={() =>
                                    setHoverEquipments(equipmentsRatingValue)
                                  }
                                  onMouseLeave={() => setHoverEquipments(null)}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </label>
                            );
                          })}
                        </div>
                        <br />

                        {/* CLEANLESS */}
                        <p className="flex bold justify-center">Cleanless</p>
                        <div className="flex flex-row justify-center xl:justify-start md:justify-start sm:justify-center">
                          {[...Array(5)].map((star, i) => {
                            const cleanlessRatingValue = i + 1;
                            return (
                              <label key={i}>
                                <input
                                  type="radio"
                                  name="rating"
                                  className="hidden"
                                  value={cleanlessRatingValue}
                                  onClick={() =>
                                    setRatingCleanless(cleanlessRatingValue)
                                  }
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-8 w-8 cursor-pointer star"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  color={
                                    cleanlessRatingValue <=
                                    (hoverCleanless || ratingCleanless)
                                      ? "#ffc107"
                                      : "#e4e5e9"
                                  }
                                  onMouseEnter={() =>
                                    setHoverCleanless(cleanlessRatingValue)
                                  }
                                  onMouseLeave={() => setHoverCleanless(null)}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </label>
                            );
                          })}
                        </div>
                        <br />
                      </div>
                      <div className="flex flex-col flex-grow ml-5 mr-5">
                        <div className="flex flex-row w-full">
                          <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-7 mt-2"
                            name="title"
                            id="title"
                            placeholder="Title of review"
                            onChange={handleChange}
                            value={title}
                          />
                        </div>
                        <div className="flex flex-row h-48 xl:h-full md:h-full sm:h-full">
                          <textarea
                            name="comment"
                            id="comment"
                            className="block border border-grey-light w-full p-3 rounded mb-6 self-stretch"
                            placeholder="Comment"
                            onChange={handleChange}
                            value={comment}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-grow col-span-1 justify-center align-center">
                      <p className="red-text">
                        <span id="spanErrorMessage"></span>
                      </p>
                    </div>
                    <div className="flex flex-grow col-span-1 justify-center align-center">
                      <p className="red-text">
                        <span id="spanErrorMessage"></span>
                      </p>
                      <button
                        onClick={verifyData}
                        className="justify-center mx-5 w-full align-center focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddReview;
