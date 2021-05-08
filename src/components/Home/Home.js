import React from 'react';
import Header from '../Header/Header';
import "../Home/Home.css"

const Home = () => {



    return (
        <div className="w-full h-screen bg-home w-full h-full bg-no-repeat bg-cover bg-center overflow-hidden">

            <div className="mx-auto flex-1 flex items-center justify-center px-2 w-full min-h-screen min-h-screen flex flex-col">
                <div className="mt-1 relative w-4/12">
                    <input type="search" className="w-full pl-7 rounded-md h-14 text-xl border-2 border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600" placeholder="Search" />
                    <div className="absolute inset-y-0 right-0 flex">
                        <button className="h-full py-0 px-5 rounded-md focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button className="border-l-2 border-gray-900 h-full py-0 px-5 text-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* HEADER DDE LA PAGE  */}
            <Header />
        </div>

    )
}

export default Home;