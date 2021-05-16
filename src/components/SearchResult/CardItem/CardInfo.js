import React from "react";
import CardPropertyIcons from "./CardPropertyIcons";
import { BiCalendar } from "react-icons/bi";
import "../../../App.css";

const CardInfo = (props) => {
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
        <div className="gold-color mt-2 uppercase text-xs font-semibold tracking-wider">
          {props.city}
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-gold hover:bg-gray-200 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <BiCalendar className="mr-2" />
            {props.price}€<span className="ml-1 text-sm"> /nuit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
