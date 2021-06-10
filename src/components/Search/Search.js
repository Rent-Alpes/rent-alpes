import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase';
import app from 'firebase/app';
import algoliasearch from 'algoliasearch';
import { SearchProperty } from "../Algolia/Algolia";

const Search = () => {

  const resarchdata = {
    query: '',
    results: {},
    loading: false,
    message: ''
  }
  const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
  const index = client.initIndex("Property");
  useEffect(() => {
    document.getElementById("search-input").focus();
  });
  const handleChange = event => {
    const query = event.target.value;
    resarchdata.query = query;
    resarchdata.loading = true;
    resarchdata.message = "";
    SearchProperty(query);
  }

  const { query } = resarchdata.query;
  return (
    <div className="relative widthSearchBar xl:w-4/12 lg:w-8/12 md:w-10/12 sm:w-10/12 mx-auto">
      <input type="text"
        value={query}
        name="query" id="search-input" placeholder="Rechercher..."
        onChange={handleChange}
        className="static w-full pl-7 rounded-md h-14 text-xl border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white bg-opacity-90"
        placeholder="Search" />

      <div className="absolute inset-y-0 right-0">
        <button className="static h-14 px-5 rounded-md focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <button className="inline-block border-l-2 h-14 border-gray-900 px-5 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;