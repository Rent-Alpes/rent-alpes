import React, { useState, useContext, useEffect } from "react";
import { firebaseContext } from "../Firebase";
import firebase from "firebase/app";
import ViewReview from "../Review/ViewReview";

const GetReview = ({ propertyId, propertyName }) => {
  const firebase = useContext(firebaseContext);

  const [userSession, setUserSession] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [averageRatingReview, setAverageRatingReview] = useState(0);
  const [ivalue, setIvalue] = useState(0);
  const [showModalGetReview, setShowModalGetReview] = useState(false);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user) => {
      setUserSession(user);
    });

    if (!!userSession) {
      firebase
        .property()
        .doc(propertyId)
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
                    (rate) => rate + rev.data().averageRating,
                    setReviewList((review) => [...review, rev.data()])
                  ),
                setIvalue((numb) => numb + 1)
              )
          );
        });
    }
  }, [userSession]);

  function handleClick() {
    setShowModalGetReview(true);
  }

  function close() {
    setShowModalGetReview(false);
  }

  return (
    <>
      <p onClick={handleClick} className="text-xs text-gray-800">
        <a className="cursor-pointer underline">{ivalue} reviews</a> >
      </p>

      {showModalGetReview ? (
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
                <span className="text-base">Close</span>
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
                      {propertyName}
                    </p>
                    <em className="text-yellow-500 text-3xl font-bold">—</em>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-row mb-4 ">
                      <div className="w-1/5 text-center bg-gray-100 p-1 rounded">
                        <p className="text-sm font-base">Average Rating</p>
                        <p className="text-5xl md:text-2xl sm:text-xl text-yellow-500">
                          {(averageRatingReview / ivalue).toFixed(1)}/5
                        </p>
                      </div>
                      <div className="w-full bg-gray-100 p-1 rounded ml-4 flex-grow">
                        <p className="text-sm font-base pl-2">
                          The reviews of our customers, a pledge of confidence
                        </p>
                        <p className="text-xl font-normal text-yellow-500 pl-2">
                          Reviews come exclusively from customers who have
                          booked with Rent'Alpes
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="w-1/5 flex-grow text-center bg-white py-5 border-dotted border-t-2 border-b-2 border-gray-200">
                        <div>
                          <p className="text-xl font-normal pb-2">
                            Rating breakdown (based on {ivalue} reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-96 overflow-auto">
                      {reviewList &&
                        reviewList.map((review, i) => {
                          return <ViewReview key={i} review={review} />;
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default GetReview;
