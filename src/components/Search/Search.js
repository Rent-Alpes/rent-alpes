import React, { useState, useEffect } from "react";
import CardItem from "../SearchResult/CardItem";
import HeaderDark from "../HeaderDark/HeaderDark";
import { SearchBar } from "./SearchBar";
import { useLocation } from "react-router-dom";
import SearchInMap from "../MapLocations/SearchInMap";
import { BiMapAlt } from "react-icons/bi";

const Search = () => {
  const [properties, setProperties] = useState();
  const [listIsVisible, setListIsVisible] = useState(true);
  const { state } = useLocation();

  function handleChange(value) {
    setProperties(value);
  }

  useEffect(() => {
    setProperties(state);
  }, [state]);

  return (
    <>
      <HeaderDark />
      <div className="flex mt-10">
        <SearchBar properties={properties} onChange={handleChange} />
        <button
          onClick={() => {
            setListIsVisible(!listIsVisible);
          }}
          className="mr-3 inline-block border-2 h-14 border-gray-900 px-5 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600"
        >
          <BiMapAlt />
        </button>
      </div>

      <div className="flex flex-wrap overflow-hidden mt-10 mb-10">
        {listIsVisible
          ? properties &&
            properties.map((property) => (
              <div
                key={property.objectID}
                className="my-3 px-3 w-full overflow-hidden sm:my-2 sm:px-2 sm:w-1/2 md:my-3 md:px-3 md:w-1/2 lg:my-3 lg:px-3 lg:w-1/3 xl:my-3 xl:px-3 xl:w-1/4"
              >
                <CardItem
                  idproperty={property.objectID}
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
            ))
          : properties && <SearchInMap propertyList={properties} />}
      </div>
    </>
  );
};

export default Search;
