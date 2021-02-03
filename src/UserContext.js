import React, {useEffect, useState, createContext, useReducer} from 'react';
import {firebase} from "./firebase";

const initialState = {username: null, isLoggedIn: false, isAdmin: false, userList: []};
export const UserContext = createContext(initialState);

export const {Provider} = UserContext;

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setUser':
                return ({...state, username: action.payload.user.user.email, isLoggedIn: true});
            case 'setAdmin':
                return ({...state, isAdmin: true});
            case 'logout':
                return ({...state, username: null, isLoggedIn: false, isAdmin: false});
            default:
                throw new Error();
        }
    }, initialState);
    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    )
};