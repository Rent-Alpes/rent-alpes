import React from 'react';
// import { Link } from 'react-router-dom';
// import { firebaseContext } from '../Firebase';
// import logo from '../../images/logo.png'
import "../Home/Home.css"

const Home = () => {



    return (
        <div className="w-full h-screen">
            <div className="bg-home w-full h-screen bg-no-repeat bg-cover bg-center">
                <div className="min-h-screen flex flex-col">
                    {/* SEARCHBAR */}
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 w-full">
                        <div className="mt-1 relative rounded-md shadow-sm w-6/12">
                            <input type="text" name="price" id="price" className="w-full pl-7 pr-12 rounded-md h-14" placeholder="Search" />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button id="currency" name="currency" className="h-full py-0 pl-2 pr-7 border-transparent bg-white text-gray-500 sm:text-sm rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                <button id="currency" name="currency" className="btn-calendar border border-grey-light border-l-2 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-l-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home;