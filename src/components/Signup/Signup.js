import "../../App.css";
import React from 'react';

const Signup = () => {

    return (
        <div class="bg-yellow-500 min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lastName"
                        placeholder="Last Name" />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstName"
                        placeholder="First Name" />

                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />

                    <button type="button" class="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg" >
                        SIGN UP
                    </button>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?
                    <a class="no-underline border-b border-blue text-blue pl-1">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Signup;
