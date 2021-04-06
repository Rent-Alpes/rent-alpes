import React, { useState, useContext, useEffect } from 'react';

const ForgetPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = () => {

    }

    return (
        <div>
            <div className="bg-yellow-500 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Password assistance</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <button className="w-full focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg" >
                                SEND EMAIL
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword