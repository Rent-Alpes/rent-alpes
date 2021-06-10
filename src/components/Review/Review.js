import React, { useState, useContext } from "react";

const Review = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="bg-gray-700 w-screen h-screen">
      <div className="flex  items-center">
        {/* CLEANLESS */}
        <p className="text-white bold mr-3">Cleanless</p>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                className="hidden"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer star"
                fill="none"
                viewBox="0 0 20 20"
                fill="currentColor"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </label>
          );
        })}
        <br />
      </div>
    </div>
  );
};

export default Review;
