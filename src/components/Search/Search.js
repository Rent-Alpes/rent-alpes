import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase';
import app from 'firebase/app';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const Search = () => {

    function ezaea(){
        console.log("dsqdq");
    }
    const resarchdata = {
        query: '',
        results: {},
        loading: false,
        message: ''
    }
    const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
    const index = client.initIndex("Property");

    const objects = [
        {
          objectID: 4,
          name: "testtesttesttest"
        }
      ];
      
      index
        .saveObjects(objects);
    //     .then(({ objectIDs }) => {
    //       console.log(objectIDs);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    const handleChange = event => {
        const query = event.target.value;
        resarchdata.query = query;
        resarchdata.loading = true;
        resarchdata.message = "";
        console.log(query);
        index
        .search(query)
        .then(({ hits }) => {
          console.log(hits);
        })
        .catch(err => {
          console.log(err);
        });
        //researchProperty(query)

    }

    const { query } = resarchdata.query;
    return (
        <InstantSearch indexName="Property" value={query} 
                        name="query" id="search-input" placeholder="Rechercher..." 
                        onChange={handleChange}  searchClient={client} 
                        className="h-12 w-96 pr-8 pl-12 rounded z-0 focus:shadow focus:outline-none">
            {/* <SearchBox/>
            <Hits/> */}
        </InstantSearch>
    );
};

export default Search;