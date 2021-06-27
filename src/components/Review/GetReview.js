import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import firebase from "firebase/app";

const GetReview = () => {
  const firebase = useContext(firebaseContext);

  const [userSession, setUserSession] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [averageRatingReview, setAverageRatingReview] = useState(0);
  const [ivalue, setIvalue] = useState(0);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      setUserSession(user);
    });

    if (!!userSession) {
      firebase
        .property()
        .doc("AiFPT2JeMsGp7TDCmzTe")
        .get()
        .then((doc) => {
          const reviews = doc.data().avis;
          reviews.forEach((review) =>
            firebase
              .review()
              .doc(review)
              .get()
              .then(
                (rev) =>
                  setAverageRatingReview(
                    (rate) => rate + rev.data().averageRating
                  ),
                setIvalue((numb) => numb + 1)
              )
          );
        });
    }
  }, [userSession]);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          <div className="flex justify-end text-white">
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

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="text-center">
                <p className="text-2xl text-gray-900 " id="modal-title">
                  Property Name
                </p>
                <em className="text-yellow-500 text-3xl font-bold">—</em>
              </div>
              <div className="mt-2">
                <div className="flex flex-row mb-4 ">
                  <div className="w-1/5 text-center bg-gray-100 p-1 rounded">
                    <p className="text-sm font-base">Average Rating</p>
                    <p className="text-5xl md:text-4xl text-yellow-500">
                      {(averageRatingReview / ivalue).toFixed(1)}/5
                    </p>
                  </div>
                  <div className="w-full bg-gray-100 p-1 rounded ml-4 flex-grow">
                    <p className="text-sm font-base pl-2">
                      The reviews of our customers, a pledge of confidence
                    </p>
                    <p className="text-xl font-normal text-yellow-500 pl-2">
                      Reviews come exclusively from customers who have booked
                      with Rent'Alpes
                    </p>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-1/5 flex-grow text-center bg-white py-5 border-dotted border-t-2 border-b-2 border-gray-200">
                    <div>
                      <p className="text-xl font-normal pb-2">
                        Rating breakdown (based on {ivalue} reviews)
                      </p>
                      {/* <div className="flex flex-row justify-center">
                        {[...Array(5)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#ffc107"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        <p className="text-lg font-base pl-3 flex items-center  w-8">
                          148
                        </p>
                      </div>
                      <div className="flex flex-row justify-center">
                        {[...Array(4)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#ffc107"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 cursor-pointer star"
                          fill="none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          color="#e4e5e9"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <p className="text-lg font-base pl-3 flex items-center  w-8">
                          68
                        </p>
                      </div>
                      <div className="flex flex-row justify-center">
                        {[...Array(3)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#ffc107"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        {[...Array(2)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#e4e5e9"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        <p className="text-lg font-base pl-3 flex items-center  w-8">
                          97
                        </p>
                      </div>
                      <div className="flex flex-row justify-center">
                        {[...Array(2)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#ffc107"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        {[...Array(3)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#e4e5e9"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        <p className="text-lg font-base pl-3 flex items-center">
                          12
                        </p>
                      </div>
                      <div className="flex flex-row justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 cursor-pointer star"
                          fill="none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          color="#ffc107"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {[...Array(4)].map((star, i) => {
                          return (
                            <label key={i}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 cursor-pointer star"
                                fill="none"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                color="#e4e5e9"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </label>
                          );
                        })}
                        <p className="text-lg font-base pl-3 flex items-center w-8">
                          56
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetReview;
