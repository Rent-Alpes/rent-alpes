import React, { useContext, useEffect, useState } from "react";
import app from "firebase/app";
import { firebaseContext } from "../Firebase";
import Table from "react-tailwind-table";

const ViewReview = ({ review }) => {
  const [user, setUser] = useState("");
  const db = app.firestore();

  //  CLEANLESS
  const [ratingCleanless, setRatingCleanless] = useState(null);
  // Location
  const [ratingLocation, setRatingLocation] = useState(null);
  // Equipment
  const [ratingEquipments, setRatingEquipments] = useState(null);

  useEffect(() => {
    var docUser = db.collection("Users");
    docUser
      .doc(review.idUser)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });

    setRatingLocation(review.location);
    setRatingEquipments(review.equipments);
    setRatingCleanless(review.cleanless);
  }, [review]);

  return (
    <div className="w-full border-b-2 border-solid border-gray-100">
      <div className="flex flex-row px-2 py-5">
        <div className="flex">
          <span className="text-sm my-auto pl-3">{user.lastName}</span>
          <span className="text-sm my-auto pl-1 pr-5">{user.firstName}</span>
        </div>

        <div className="flex flex-col">
          <p className="text-2xl pb-4"> {review.title}</p>
          <p className="text-base">{review.comment}</p>

          <div className="flex pt-5">
            <div className="flex flex-row xl:ml-2 sm:ml-5 w-full xl:w-40 md:w-40 sm:w-40">
              <div className="flex flex-col pr-5">
                {/* LOCATION */}
                <p className="flex bold justify-center text-base">
                  Location :{" "}
                </p>
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
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 cursor-pointer star"
                          fill="none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          color={
                            locationRatingValue <= ratingLocation
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    );
                  })}
                </div>
                <br />
              </div>
              {/* EQUIPMENTS */}
              <div className="flex flex-col pr-5">
                <p className="flex bold justify-center text-base">
                  Equipments :
                </p>
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
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 cursor-pointer star"
                          fill="none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          color={
                            equipmentsRatingValue <= ratingEquipments
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    );
                  })}
                </div>
                <br />
              </div>

              <div className="flex flex-col">
                {/* CLEANLESS */}
                <p className="flex bold justify-center text-base">
                  Cleanless :
                </p>
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
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 cursor-pointer star"
                          fill="none"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          color={
                            cleanlessRatingValue <= ratingCleanless
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </label>
                    );
                  })}
                </div>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReview;
