import React, { useState } from "react";
import CardItem from "../SearchResult/CardItem";
import HeaderDark from "../HeaderDark/HeaderDark";
import { SearchBar } from "./SearchBar";

const Search = (props) => {
  const [properties, setProperties] = useState();

  function handleChange(value) {
    setProperties(value);
  }

  return (
    <>
      <HeaderDark />
      <SearchBar properties={properties} onChange={handleChange} />
      <div className="flex flex-wrap overflow-hidden mt-10">
        {properties &&
          properties.map((property) => (
            <div
              key={property.name}
              className="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/4"
            >
              <CardItem
                image={property.thumb}
                name={property.name}
                city={property.city}
                price={property.price}
                bathroom={property.bathroom}
                room={property.room}
                traveler={property.traveler}
                surface={property.surface}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Search;
