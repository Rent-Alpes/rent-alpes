import React, { useState, useContext, useEffect } from 'react';
import { firebaseContext } from '../Firebase';

const ForgetPassword = props => {
    const firebase = useContext(firebaseContext);

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
            .then(() => {
                setError(null);
                setSuccess('An email sent to reset your password');
                setEmail("");

                //Redirection to login 5 seconds
                setTimeout(() => {
                    props.history.push('/login');
                }, 5000)
            })
            .catch(error => {
                setError(error);
                setEmail("");
            })
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

                            {success && <label className="green-text">{success}</label>}
                            {error && <label className="red-text">{error}</label>}

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