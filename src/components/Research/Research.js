import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase';

const Research = () => {
    const firebase = useContext(firebaseContext);

    console.log(firebase);
    const resarchdata= {
        query:'',
        results:{},
        loading: false,
        message:''
    } 
    
    const handleChange = event => {
        const query = event.target.value;
        resarchdata.query = query;
        resarchdata.loading = true;
        resarchdata.message = "";
        
        console.log(query);
    }

    // const handleSubmit =event=>{
    //     var message = firebase.database().ref
    // }
    const{query} = resarchdata.query;
    return(
        <div className="">
            <h2 className="heading">Recherche</h2>
            
            <input type="text" value={query} name="query" id="search-input" placeholder="Rechercher..." onChange={handleChange} className="border-2 border-black"></input>
            <button className="border-2 border-black">Rechercher</button>
        </div>
    );
};

export default Research;