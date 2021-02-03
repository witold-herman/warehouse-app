import React, {useContext} from 'react';
import {firebase} from './firebase';
import {UserContext} from "./UserContext";
import {NewChangesContext} from "./NewChangesContext";
import {useToasts} from "react-toast-notifications";

export const Logout = () => {

    const flags = useContext(NewChangesContext)
    const user = useContext(UserContext);
    const {dispatch} = user;
    const {dispatch: flagsDispatch} = flags;
    const {addToast} = useToasts();

    const logOutUser = () => {
        firebase.auth().signOut()
            .then(() => dispatch({type: 'logout',
            payload: {
                isAdmin: false
            }}))
            .then(() => addToast("Signed out", {
                appearance: `info`,
                autoDismiss: true
            }) )
            .then(
                flagsDispatch ({
                    type: "logout"
                })
            )
    };

    return <button className="button-logout" onClick={logOutUser} children="Log Out"/>;
};
