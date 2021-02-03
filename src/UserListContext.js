import React, {createContext, useState, useEffect, useContext, useReducer} from 'react';
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";

const initialState = {userList: []};
export const UserListContext = createContext(initialState);

export const UserListProvider = props => {
    const [userList, setUserList] = useState([]);
    const flags = useContext(NewChangesContext);

    useEffect(() => {
        let posts = [];

        firebase.firestore()
            .collection('users')
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    posts.push(doc.data());
                });
            })
            .then(() => {
                setUserList(posts.map(d => {
                    return (
                        d.name
                    )
                }));
            })

    }, [flags.state.userIsCreatedFlag]);

    return (
        <UserListContext.Provider value={[userList, setUserList]}>
            {props.children}
        </UserListContext.Provider>
    )
};