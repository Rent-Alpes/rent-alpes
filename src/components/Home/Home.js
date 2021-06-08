import React from 'react';
import Header from '../Header/Header';
import "../Home/Home.css";
import { SynchPropertys } from "../Algolia/Algolia";

const Home = () => {
    SynchPropertys();


    return (

        <div className="w-full h-screen bg-home h-full bg-no-repeat bg-cover bg-center overflow-hidden flex" >

            {/* HEADER DDE LA PAGE  */}
            <Header />
            <div className="h-full w-full flex flex-col justify-center">

                <div className="relative xl:w-4/12 mx-auto">
                    <input type="search" className="static w-full pl-7 rounded-md h-14 text-xl border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 bg-white bg-opacity-90" placeholder="Search" />
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
            </div>

        </div>

    )
}

export default Home;