import React, { useContext } from 'react';
import { firebaseContext } from '../Firebase';

const Lougout = (props) => {
    const firebase = useContext(firebaseContext);

    function deconnectUser() {
        firebase.signOutUser();
    }

    return (

        <a
            onClick={deconnectUser}
            className="text-gray-700 block px-4 py-2 text-sm hover:bg-red-500 hover:text-white hover:bg-opacity-80 cursor-pointer"
            id="headlessui-menu-item-8"
            role="menuitem"
            tabIndex="-2"
            href="/#"
        >
            Log out
        </a>

    )
}

export default Lougout;