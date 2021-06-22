import React from "react";
import CardPropertyIcons from "./CardPropertyIcons";
import CardPriceButton from "./CardPriceButton";
import { BiMap } from "react-icons/bi";
import "../../../App.css";

const CardInfo = (props) => {
  console.log(props);
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
