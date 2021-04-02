import React, { useState } from 'react';

const Signup = () => {
    //Objet contenant toutes les données remplies
    const data = {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const [loginData, setLoginData] = useState(data);

    //Attribution de la value
    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    //destructuring (epeche de voir le loginData)
    const { lastName, firstName, email, password, confirmPassword } = loginData;


    // Conditions erreurs 
    const isLastNameNull = lastName === ''
        ? <label >Please enter your last name</label> : ""

    const isFirstNameNull = firstName === ''
        ? <label >Please enter your first name</label> : ""

    const isEmailNull = email === ''
        ? <label >Please enter your first name</label> : ""

    const isPasswordNull = password === ''
        ? <label >Please enter your password</label> : ""

    const isConfirmPasswordNull = confirmPassword === ''
        ? <label >Please confirm your password</label> : ""

    const isPasswordMatch = password !== confirmPassword
        ? <label >Passwords do not match</label> : ""

    return (
        <div className="bg-yellow-500 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={handleChange} />

                        {isLastNameNull}

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={handleChange} />

                        {isFirstNameNull}

                        <input
                            type="email"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange} />

                        {isEmailNull}

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange} />

                        {isPasswordNull}

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange} />

                        {isConfirmPasswordNull}
                        {isPasswordMatch}

                        <button type="button" className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg" >
                            SIGN UP
                        </button>
                    </form>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <a className="no-underline border-b border-blue text-blue pl-1">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
}

export default Signup;
