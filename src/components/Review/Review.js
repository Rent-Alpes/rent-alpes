import React, { useState, useContext } from "react";

const Review = () => {
<<<<<<< HEAD
  //  CLEANLESS
  const [ratingCleanless, setRatingCleanless] = useState(null);
  const [hoverCleanless, setHoverCleanless] = useState(null);

  // Location
  const [ratingLocation, setRatingLocation] = useState(null);
  const [hoverLocation, setHoverLocation] = useState(null);

  // Equipment
  const [ratingEquipment, setRatingEquipment] = useState(null);
  const [hoverEquipment, setHoverEquipment] = useState(null);

  return (
    <div className="bg-white w-full h-full">
      <form>
        <div className="flex flex-col w-full 2xl:w-5/12 xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-full">
          <div className="flex flex-wrap flex-row">
            <div className="flex flex-col xl:ml-2 sm:ml-5 w-full xl:w-40 md:w-40 sm:w-40">
              {/* LOCATION */}
              <p className="flex bold justify-center">Location</p>
              <div className="flex flex-row justify-center xl:justify-start md:justify-start sm:justify-center">
                {[...Array(5)].map((star, i) => {
                  const locationRatingValue = i + 1;
                  return (
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={locationRatingValue}
                        onClick={() => setRatingLocation(locationRatingValue)}
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

              {/* EQUIPMENT */}
              <p className="flex bold justify-center">Equipment</p>
              <div className="flex flex-row justify-center xl:justify-start md:justify-start sm:justify-center ">
                {[...Array(5)].map((star, i) => {
                  const equipmentRatingValue = i + 1;
                  return (
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={equipmentRatingValue}
                        onClick={() => setRatingEquipment(equipmentRatingValue)}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 cursor-pointer star"
                        fill="none"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        color={
                          equipmentRatingValue <=
                          (hoverEquipment || ratingEquipment)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() =>
                          setHoverEquipment(equipmentRatingValue)
                        }
                        onMouseLeave={() => setHoverEquipment(null)}
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
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={cleanlessRatingValue}
                        onClick={() => setRatingCleanless(cleanlessRatingValue)}
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
                  defaultValue=""
                  className="block border border-grey-light w-full p-3 rounded mb-7 mt-2"
                  name="title"
                  id="title"
                  placeholder="Title of review"
                />
              </div>
              <div className="flex flex-row h-48 xl:h-full md:h-full sm:h-full">
                <textarea
                  className="block border border-grey-light w-full p-3 rounded mb-6 self-stretch"
                  placeholder="Comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-grow col-span-1 justify-center align-center">
            <button className="justify-center mx-5 w-full align-center focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Review;
