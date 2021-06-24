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

  const handleChange = (event) => {
    if (event.target.id === "filter-check") {
      if (event.target.checked === true) {
        setfilterUse(filterUse = event.target.checked);
      }
      else if (event.target.checked === false) {
        setfilterUse(filterUse = event.target.checked);
        setfilterParams(filterParams = {})
        ApplyFiltersParams(filterParams, false);
      }

    } else {
      const query = event.target.value;
      resarchdata.query = query;
      resarchdata.loading = true;
      resarchdata.message = "";
      props.onChange(SearchProperty(query));
    }
  };  
  const filtersChange = (event) => {
    if(event.target.value != ""){
      setfilterParams({ ...filterParams, [event.target.name]: event.target.value });
    }
    else{
      delete filterParams[event.target.name];
    }
  };
const searchClick = ()=>{
  props.onChange(SearchProperty(" "));
}
  const activeFilters = (event) => {
    if(filterUse)
    {
      if (filterParams.minprice != "" && filterParams.maxprice != "") {
        var maxPrice = filterParams.maxprice;
        var minPrice = filterParams.minprice;
        if (parseInt(filterParams.minprice) > parseInt(filterParams.maxprice)) {
          document.getElementById("max-price").value = minPrice;
          document.getElementById("min-price").value = maxPrice;
        }
      }
      ApplyFiltersParams(filterParams, true);
    }
  };


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
        className="static w-full pl-7 rounded-md h-14 text-xl border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white bg-opacity-90"
      />
      {/* <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl mx-auto">
        <nav x-data="{ open: false }">
            <button class="text-gray-500 w-10 h-10 relative focus:outline-none bg-white" @click="open = !open">
                <span class="sr-only">Open main menu</span>
                <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                    <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
                </div>
            </button>
        </nav>
    </div>
</div> */}
      <Checkbox id="filter-check" onChange={handleChange}></Checkbox>
      <br />
      <br />
      <label>Min price : </label>
      <input id="min-price" name="minprice" type="number" onChange={filtersChange} className="border-2 border-black"></input>
      <br />
      <br />
      <br />
      <br />
      <label>Max price : </label>
      <input id="max-price" name="maxprice" type="number" onChange={filtersChange} className="border-2 border-black"></input>
      <br />
      <br />
      <br />
      <br />
      <label>Min size : </label>
      <input id="min-size" name="surface" type="number" onChange={filtersChange} className="border-2 border-black"></input>
      <br />
      <br />
      <br />
      <br />
      <label>Min rooms : </label>
      <input id="min-room" name="room" type="number" onChange={filtersChange}  className="border-2 border-black"></input>
      <br />
      <br />
      <br />
      <br />
      <label>Min traveler : </label>
      <input id="min-traveler" name="traveler" type="number" onChange={filtersChange} className="border-2 border-black"></input>
      <br />
      <br />
      <br />
      <br />
      <label>Min bathroom : </label>
      <input id="min-bathroom" name="bathroom" type="number" onChange={filtersChange} className="border-2 border-black"></input>
      <br />
      <br />
      {/* <label>Ville : </label>
      <input id="city" onChange={filtersChange} type="text" className="border-2 border-black"></input> */}
      <br />
      <br />
      <button onClick={activeFilters}>Validate</button>
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

        {
          // <button className="inline-block border-l-2 h-14 border-gray-900 px-5 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600">
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     className="h-6 w-6"
          //     fill="none"
          //     viewBox="0 0 24 24"
          //     stroke="currentColor"
          //   >
          //     <path
          //       strokeLinecap="round"
          //       strokeLinejoin="round"
          //       strokeWidth={2}
          //       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          //     />
          //   </svg>
          // </button>
        }
      </div>
    </div>
  );
};
