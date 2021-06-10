import React, { useState } from "react";
import Header from "../Header/Header";
import "../Home/Home.css";
import { SearchBar } from "../Search/HomeSearchBar";

const Home = () => {
  const [properties, setProperties] = useState();

  function handleChange(value) {
    setProperties(value);
    console.log(properties);
  }

  return (
    <div className="w-full h-screen bg-home h-full bg-no-repeat bg-cover bg-center overflow-hidden flex">
      {/* HEADER DE LA PAGE  */}
      <Header />
      <div className="h-full w-full flex flex-col justify-center">
        <SearchBar properties={properties} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Home;
