import React, {useState} from 'react';
import {useContext} from "react";
import {NewChangesContext} from "./NewChangesContext";
import {UserContext} from "./UserContext";
import {firebase} from "./firebase";
import {useToasts} from 'react-toast-notifications';

export const EditProduct = (props) => {
    let flag = useContext(NewChangesContext);
    let user = useContext(UserContext);
    let {dispatch} = flag;
    let [editExpanded, setEditExpanded] = useState(false);
    const {addToast} = useToasts();

    const editProduct = (event) => {
        let editedArr = Object.keys(props.name).map(e => {
            return e;
        });
        let editedProductObj = {
            key: `${props.name.key}`
        };
        editedArr.forEach((element) => {
            if (element !== 'key') {
                if (document.getElementById(element).value !== "") {
                    editedProductObj[element] = document.getElementById(element).value;
                } else {
                    editedProductObj[element] = props.name[element];
                }
            }
        });
        event.preventDefault();
        expandEditField();
        firebase.firestore().collection('products').doc(`${props.name.key}`).set(editedProductObj)
            .then(() => {
                dispatch({
                    type: "setFlag"
                })
            })
            .then(() => addToast("Product edited", {
                appearance: `info`,
                autoDismiss: true
            }))
            .catch(error => addToast(error.message, {
                appearance: `error`,
                autoDismiss: true
            }))
    };

    const expandEditField = () => {
        setEditExpanded(!editExpanded);
    };

    return (
        <div>
            {(user.state.isAdmin === true) && (
                <button className="button-white" onClick={expandEditField}>
                    Edit
                </button>
            )}
            {(editExpanded === true) && (
                <form onSubmit={editProduct}>
                    {Object.keys(props.name).map(e => {
                        if (e !== 'key' && e !== 'name') {
                            return (
                                <input className="input-standard" placeholder={"  " + e} id={e} type='number'>

                                </input>
                            )
                        } else if (e === 'name') {
                            return (
                                <input className='input-standard' placeholder={"   " + e} id={e} type='text'>

                                </input>
                            )
                        }
                    })}
                    <input className="button-green" type='submit' value='Save changes'/>
                </form>
            )}
        </div>
    )
};