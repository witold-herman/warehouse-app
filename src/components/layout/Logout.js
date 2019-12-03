import React from 'react';
import {firebase} from '../../firebase';

const logOutUser = () => {
    firebase.auth().signOut()
        .then(window.location = "/login");
};

const LogOut = () => {
    return <button onClick={logOutUser} children="Log Out" />;
};

export default LogOut;
