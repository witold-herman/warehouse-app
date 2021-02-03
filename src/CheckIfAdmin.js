import React, {useContext, useEffect} from 'react';
import {UserContext} from "./UserContext";
import {firebase} from "./firebase";

export const CheckIfAdmin = () => {
    const currentUser = useContext(UserContext);
    const {dispatch} = currentUser;

    const checkAdmin = (posts) => {
        if(posts.includes(`${currentUser.state.username.split("@")[0]}`)) {
            dispatch({
                type: 'setAdmin',
            })
        }
    };

    useEffect(() => {
        let posts = [];

        firebase.firestore()
            .collection('admins')
            .get()
            .then(data => {
                data.forEach((doc) => {
                    posts.push(doc.id);
                });
            })
            .then(() => checkAdmin(posts))
    }, []);

    return (
        <>
        </>
    )
};