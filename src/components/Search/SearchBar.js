import React, { useState, useEffect } from "react";
import algoliasearch from "algoliasearch";
import { SearchProperty } from "../Algolia/Algolia";
import { ApplyFiltersParams } from "../Algolia/Algolia";
import { Checkbox } from "@material-ui/core";

export const SearchBar = (props) => {
  var [filterParams, setfilterParams] = useState({
    maxprice: "",
    minprice: "",
    surface: "",
    room: "",
    traveler: "",
    bathroom: "",
  });
  var [filterUse, setfilterUse] = useState(false);

  const resarchdata = {
    query: "",
    results: {},
    loading: false,
    message: "",
  };
 function Search(value) {
  props.onChange(SearchProperty(value));
 }
 function TrashFilters(){
  document.getElementById("min-price").value = "";
  document.getElementById("max-price").value = "";
  document.getElementById("min-traveler").value = "";
  document.getElementById("min-bathroom").value = "";
  document.getElementById("min-size").value = "";

 }
  const handleChange = (event) => {
    event.preventDefault();
    const query = event.target.value;
    resarchdata.query = query;
    resarchdata.loading = true;
    resarchdata.message = "";
    Search(query);
  };
  const filtersChange = (event) => {
    event.preventDefault();
    if (event.target.value != "") {
      setfilterParams({ ...filterParams, [event.target.name]: event.target.value });
    }
    else {
      delete filterParams[event.target.name];
    }
    document.getElementById("btnActiveFilters").style.backgroundColor = "red";
    document.getElementById("btnActiveFilters").style.color = "white";
  };
  const searchClick = () => {
    Search(document.getElementById("search-input").value);
  }
  const activeFilters = (event) => {
    if (filterUse) {
      if (filterParams.minprice != "" && filterParams.maxprice != "") {
        var maxPrice = filterParams.maxprice;
        var minPrice = filterParams.minprice;
        if (parseInt(filterParams.minprice) > parseInt(filterParams.maxprice)) {
          document.getElementById("max-price").value = minPrice;
          document.getElementById("min-price").value = maxPrice;
        }
      }
      ApplyFiltersParams(filterParams, true);
      document.getElementById("btnActiveFilters").style.backgroundColor = "green";
      document.getElementById("btnActiveFilters").style.color = "black";

    }
    Search(document.getElementById("search-input").value);
  };

  function OpenMenuFilter(event) {
    document.getElementById("burger-menu").classList.toggle("change");
    if (filterUse == true) {
      setfilterUse(filterUse = false);
      setfilterParams(filterParams = {})
      ApplyFiltersParams(filterParams, false);
      document.getElementById("group-filter").style.display = "none";
      document.getElementById("btnActiveFilters").style.backgroundColor = "red";
      document.getElementById("btnActiveFilters").style.color = "white";
      
    } else {
      setfilterUse(filterUse = true);
      document.getElementById("group-filter").style.display = "flex";
      document.getElementById("btnActiveFilters").style.backgroundColor = "red";
      document.getElementById("btnActiveFilters").style.color = "white";
    }
    Search(document.getElementById("search-input").value);
    TrashFilters();
  }

  const { query } = resarchdata.query;
  return (
    <div className="relative widthSearchBar xl:w-4/12 lg:w-8/12 md:w-10/12 sm:w-10/12 mx-auto">
      <input
        type="text"
        value={query}
        name="query"
        id="search-input"
        placeholder="Search..."
        onChange={handleChange}
        className="static w-full pl-16 pr-28 rounded-md h-14 text-xl border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white bg-opacity-90"
      />
      <div className="absolute inset-y-0 left-0 pr-2.5 border-r-2 p-px h-14 border-gray-900 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600">
        <div className="container mt-2 ml-3" id="burger-menu" onClick={OpenMenuFilter}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div>


      <div className="absolute inset-y-0 right-0">
        <button className="static h-14 px-5 rounded-md focus:outline-none"
          onClick={searchClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>


        <button className="inline-block border-l-2 h-14 border-gray-900 px-5 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      <div id="group-filter" className="relative w-full pt-3 grid grid-rows-3 grid-flow-col gap-4 hidden">
        <div className="row-span-3">
          <label className="block">Min price : </label>
          <input id="min-price" name="minprice" type="number" onChange={filtersChange} className="border-2 border-black block"></input>

          <label>Min traveler : </label>
          <input id="min-traveler" name="traveler" type="number" onChange={filtersChange} className="border-2 border-black"></input>
        </div>
        <div className="row-span-3">

          <label className="block">Max price : </label>
          <input id="max-price" name="maxprice" type="number" onChange={filtersChange} className="border-2 border-black block"></input>

          <label>Min bathroom : </label>
          <input id="min-bathroom" name="bathroom" type="number" onChange={filtersChange} className="border-2 border-black"></input>
        </div >
        <div className="row-span-3">

          <label className="block">Min size : </label>
          <input id="min-size" name="surface" type="number" onChange={filtersChange} className="border-2 border-black block"></input>

        </div>
        <div className="row-span-3 flex items-center">
          <button id="btnActiveFilters" className="border-2 border-black rounded-md" onClick={activeFilters}>Validate</button>
        </div>
        {/* <label>Ville : </label>
      <input id="city" onChange={filtersChange} type="text" className="border-2 border-black"></input> */}
      </div>
    </div>
  );
};
