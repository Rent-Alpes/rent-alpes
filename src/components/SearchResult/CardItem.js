import React from "react";
import { BiBath, BiBed, BiUser } from "react-icons/bi";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const CardItem = (props) => {
  const [fav, setFav] = React.useState(false);
  return (
    <div className="wrapper antialiased text-gray-900">
      <div>
        <img
          src="https://source.unsplash.com/random/350x350"
          alt=" random image"
          className="w-full object-cover object-center rounded-lg shadow-md"
        />

        <div className="relative px-4 -mt-20 mb-6">
          <div className="bg-white pt-2 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div className="text-gray-600 uppercase text-xs font-semibold tracking-wider">
                {props.city}
              </div>
              <div>
                <span className="text-teal-600 text-3xl">
                  {fav && (
                    <IconButton
                      onClick={() => {
                        setFav(!fav);
                      }}
                      aria-label="delete"
                      color="black"
                    >
                      <FavoriteBorderIcon></FavoriteBorderIcon>
                    </IconButton>
                  )}
                  {!fav && (
                    <IconButton
                      onClick={() => {
                        setFav(!fav);
                      }}
                      aria-label="delete"
                      color="alert"
                    >
                      <Favorite></Favorite>
                    </IconButton>
                  )}
                </span>
              </div>
            </div>

            <h4 className="mt-1 text-2xl font-semibold uppercase leading-tight truncate">
              {props.name}
            </h4>
            <div className="flex  items-center justify-between mt-4">
              <div className="flex">
                <div className="flex items-center pr-2">
                  <span className="text-gray-400 text-xl font-semibold">
                    <BiBath />
                  </span>
                  <span className="text-gray-400 pl-1 text-xl font-semibold">
                    {props.bathroom}
                  </span>
                </div>
                <div className="flex items-center pr-2">
                  <span className="text-gray-400 text-xl">
                    <BiBed />
                  </span>
                  <span className="text-gray-400 pl-1 text-xl font-semibold">
                    {props.room}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 text-xl font-semibold">
                    <BiUser />
                  </span>
                  <span className="text-gray-400 pl-1 text-xl font-semibold">
                    {props.traveler}
                  </span>
                </div>
              </div>
              <span className="text-teal-600 text-3xl font-semibold">
                {props.price}€
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
