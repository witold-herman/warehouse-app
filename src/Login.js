import React, {useContext, useState} from 'react';
import {firebase} from "./firebase";
import {UserContext} from "./UserContext";
import './css/login.css'
import {useToasts} from 'react-toast-notifications';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(UserContext);
    const {dispatch} = user;
    const {addToast} = useToasts();

    const handleEmailInput = (e) => {
        setEmail(e = e.target.value);
    };

    const handlePasswordInput = (e) => {
        setPassword(e = e.target.value);
    };

    const handleSubmit = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(data => dispatch({
                type: 'setUser',
                payload: {
                    user: data
                }
            }))
            .then((data) => addToast(`Successfully logged in`, {
                appearance: `success`,
                autoDismiss: true
            }))
            .catch(error => {
                addToast(error.message, {
                    appearance: `error`,
                    autoDismiss: true,
                })
            });
    };

    return (
        <div className="box">
            <h1>Sign in</h1>
            <input placeholder='email' type='text' onChange={handleEmailInput}/>
            <input placeholder='password' type='password' onChange={handlePasswordInput}/>
            <button id="login-button" onClick={handleSubmit}>Login</button>
        </div>
    )
};