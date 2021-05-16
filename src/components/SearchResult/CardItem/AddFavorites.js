import { useEffect, useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

const AddFavorites = () => {
  const [fav, setFav] = useState([]);
  useEffect(() => {}, [fav]);
  return (
    <div>
      <span className="text-2xl">
        {fav && (
          <IconButton
            onClick={() => {
              setFav(!fav);
            }}
          >
            <FavoriteBorderIcon htmlColor="white"></FavoriteBorderIcon>
          </IconButton>
        )}
        {!fav && (
          <IconButton
            onClick={() => {
              setFav(!fav);
            }}
          >
            <Favorite htmlColor="red"></Favorite>
          </IconButton>
        )}
      </span>
    </div>
  );
};

export default AddFavorites;
