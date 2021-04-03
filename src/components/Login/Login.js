import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseContext } from '../Firebase'

const Login = (props) => {

    const firebase = useContext(firebaseContext);

    //Objet contenant toutes les données remplies
    const data = {
        email: '',
        password: '',
    }

    const [loginData, setLoginData] = useState(data);
    const [errordb, setErrorDB] = useState('');

    //Attribution de la value
    const handleChange = e => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }


    const handleSubmit = e => {
        e.preventDefault();

        //destructuring
        const { email, password } = loginData;

        firebase.loginUser(email, password)
            .then(user => {
                setLoginData({ ...data });
            })
            .catch(error => {
                setErrorDB(error);
                setLoginData({ ...data });
            })

    }

    //destructuring (epeche de voir le loginData)
    const { email, password } = loginData;

    //Gestion des erreurs
    const errorMsgDB = errordb !== '' && <label className="red-text">{errordb.message}</label>;

    return (
        <div>
            <div className="bg-yellow-500 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                            />

                            <input
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange}
                            />

                            {errorMsgDB}

                            <button className="w-full focus:outline-none text-white text-sm mb-4 p-3 rounded-md bg-green-500 hover:bg-green-600 hover:shadow-lg" >
                                SIGN UP
                        </button>
                        </form>
                    </div>

                    <div className="text-grey-dark mt-6">
                        You don't have an account ?
                        <Link to="/signup" className="no-underline border-b border-blue text-blue pl-1">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;