import React, { useState, Fragment, useContext, useEffect } from 'react'
import { firebaseContext } from '../Firebase';

const Profil = props => {

    const firebase = useContext(firebaseContext);

    //Objet contenant toutes les données remplies
    const data = {
        lastName: '',
        firstName: '',
        email: '',
        phonenumber: '',
        address: '',
        postalcode: '',
        city: '',
        country: '',
    }

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState(data);

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/login')
        })

        if (!!userSession) {
            firebase.user(userSession.uid).get()
                .then(doc => {
                    if (doc && doc.exists) {
                        const myData = doc.data();
                        setUserData({ ...data, ...myData });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        return () => {
            listener()
        };
    }, [userSession]);


    //Attribution de la value
    const handleChange = e => {
        setUserData({ ...userData, [e.target.id]: e.target.value })
    }


    const handleSubmit = e => {
        e.preventDefault();

        firebase.user(userSession.uid).set(
            userData
        )
            .catch(errordb => {
                console.log(errordb)
            })
    }


    return userSession === null ? (
        <Fragment>
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-50 opacity-75 flex flex-col items-center justify-center">
                <div className="loader"></div>
                <h2 className="text-center text-gray text-xl font-semibold">Loading...</h2>
                <p className="w-1/3 text-center text-gray">This may take a few seconds, please don't close this page.</p>
            </div>
        </Fragment>
    ) : (
        <div>
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Profil</h1>
                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                defaultValue=""
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                defaultValue={userData.lastName}
                                onChange={handleChange} />

                            <input
                                type="text"
                                defaultValue=""
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                defaultValue={userData.firstName}
                                onChange={handleChange} />

                            <input
                                type="email"
                                defaultValue=""
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                id="email"
                                placeholder="Email"
                                defaultValue={userData.email}
                                onChange={handleChange} />

                            <input
                                type="tel"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="phonenumber"
                                id="phonenumber"
                                placeholder="Phone number"
                                defaultValue={userData.phonenumber}
                                onChange={handleChange} />

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="address"
                                id="address"
                                placeholder="Address"
                                defaultValue={userData.address}
                                onChange={handleChange} />

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="postalcode"
                                id="postalcode"
                                placeholder="Postal Code"
                                defaultValue={userData.postalcode}
                                onChange={handleChange} />

                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="city"
                                id="city"
                                placeholder="City"
                                defaultValue={userData.city}
                                onChange={handleChange} />

                            <button className="w-full focus:outline-none text-white text-sm mb-2 p-3 rounded-md bg-yellow-500 hover:bg-yellow-600 hover:shadow-lg" >
                                UPDATE
                            </button>
                        </form>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )

}

export default Profil