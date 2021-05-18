import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase';
import app from 'firebase/app';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const Search = () => {

    const resarchdata = {
        query: '',
        results: {},
        loading: false,
        message: ''
    }
    const client = algoliasearch('WM2R73MT8D', '8f1fea58043949f2ba7714b32998a65d');
    const index = client.initIndex("Property");

    // const objects = [
    //     {
    //       objectID: 4,
    //       name: "pablo"
    //     }
    //   ];
      
    //   index
    //     .saveObjects(objects)
    //     .then(({ objectIDs }) => {
    //       console.log(objectIDs);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });


       
    // const researchProperty = async (propertyName) => {
    //     const propertyRef = app.firestore().collection("Property");
    //     const snapshot = await propertyRef.where('country', '==', propertyName).get();
    //     if (snapshot.empty) {
    //         console.log("Aucun resultat");
    //         // return (
    //         //     <div>
    //         //         <p>Aucun resultat</p>
    //         //     </div>
    //         // );
    //     } else {
    //         const propertyList = [];
    //         snapshot.forEach(doc => {
    //             propertyList.push({ id: doc.id, data: doc.data() });
    //             console.log(propertyList);
    //             // return (
    //             //     <div>
    //             //         <p>{propertyList.id}</p>
    //             //     </div>
    //             // );
    //         });
    //     }
    // }
    // const fetchSearchResults = (updatedPageNo, query) => {

    // }
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
        // <InstantSearch indexName="Property" value={query} 
        //                 name="query" id="search-input" placeholder="Rechercher..." 
        //                 onChange={handleChange}  searchClient={client} 
        //                 className="h-12 w-96 pr-8 pl-12 rounded z-0 focus:shadow focus:outline-none">
        //     {/* <SearchBox/>
        //     <Hits/> */}
        // </InstantSearch>
        <div class=" bg-gray-200 h-screen">
            <div class="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
                <div class="relative">
                    <div class="absolute top-3 left-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input type="text" class="h-12 w-96 pr-8 pl-12 rounded z-0 focus:shadow focus:outline-none"
                     type="text" value={query} name="query" id="search-input" placeholder="Rechercher..." onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default Search;