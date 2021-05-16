import React from "react";
import CardImage from "./CardItem/CardImage";
import CardInfo from "./CardItem/CardInfo";
import AddFavorites from "./CardItem/AddFavorites";

const CardItem = (props) => {
  return (
    <div className="wrapper antialiased text-gray-900">
      <div className="relative">
        <div>
          <CardImage image={props.image} />
          <div className="absolute top-0.5 right-0.5">
            <AddFavorites />
          </div>
        </div>
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
