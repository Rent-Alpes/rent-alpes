import React, { useEffect } from "react";
import CardImage from "./CardItem/CardImage";
import CardInfo from "./CardItem/CardInfo";

const CardItem = (props) => {
  return (
    <div className="wrapper antialiased text-gray-900">
      <div>
        <CardImage image={props.image} />
        <CardInfo
          city={props.city}
          name={props.name}
          bathroom={props.bathroom}
          room={props.room}
          price={props.price}
          traveler={props.traveler}
          surface={props.surface}
        />
      </div>
    </div>
  );
};

export default CardItem;
