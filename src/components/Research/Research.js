import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase';

const Research = () => {
    const firebase = useContext(firebaseContext);
    firebase.loginUser("david.serra@test.fr","davidtesttest");
    console.log(firebase);
    const resarchdata= {
        query:'',
        results:{},
        loading: false,
        message:''
    } 
    
    // fetchSearchResults= (updatePageNo, query) =>{
    //     firebase.p 
    //     const searchResult = 
    // };
    const handleChange = event => {
        const query = event.target.value;
        this.useState(resarchdata = {
            query: query,
            loading: true,
            message: ''
        });
        resarchdata.query = query;
        console.log(resarchdata.query);
    }
    return(
        <div className="">
            <h2 className="heading">Recherche</h2>
            
            <input type="text" value={resarchdata.query} name="query" id="search-input" placeholder="Rechercher..." onChange={handleChange} className="border-2 border-black"></input>
            <button className="border-2 border-black">Rechercher</button>
        </div>
    );
};

export default Research;