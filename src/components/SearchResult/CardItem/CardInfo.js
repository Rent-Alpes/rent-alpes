import { useState, useEffect, useContext } from "react";
import CardPropertyIcons from "./CardPropertyIcons";
import CardPriceButton from "./CardPriceButton";
import { BiMap } from "react-icons/bi";
import "../../../App.css";
import { firebaseContext } from "../../Firebase";

const CardInfo = (props) => {
  const [averageRatingReview, setAverageRatingReview] = useState(0);
  const [ivalue, setIvalue] = useState(0);
  const firebase = useContext(firebaseContext);

  useEffect(() => {
    firebase
      .property()
      .doc(props.idproperty)
      .get()
      .then((doc) => {
        const reviews = doc.data().avis;
        if (reviews) {
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
        }
      });
  }, []);

  const displayReview = averageRatingReview !== 0 && (
    <div className="text-xl text-gray-800 ">
      <div className="absolute mt-2">
        <div className="flex flex-row">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer star mt-auto"
            fill="none"
            viewBox="0 0 20 20"
            fill="currentColor"
            color={"#ffc107"}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {(averageRatingReview / ivalue).toFixed(1)}/5
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative px-4 -mt-20 mb-6">
      <div className="bg-white pt-2 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <CardPropertyIcons
            bathroom={props.bathroom}
            room={props.bathroom}
            traveler={props.traveler}
          />
        </div>
        <h3 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
          {props.name}
        </h3>
        <div className="flex items-center gold-color mt-2 uppercase text-xs font-semibold tracking-wider">
          <span className="text-black pr-0.5">
            <BiMap />
          </span>
          {props.city}
        </div>
        {displayReview}
        <div className="flex justify-end mt-4">
          <CardPriceButton
            idproperty={props.idproperty}
            price={props.price}
            propertyId={props.name}
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
