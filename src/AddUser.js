import React, {useContext, useState} from 'react';
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";
import {useToasts} from 'react-toast-notifications';

export const AddUser = () => {

    let [newUserEmail, setNewUserEmail] = useState('');
    let [newUserPassword, setNewUserPassword] = useState('');
    let newChangesFlag = useContext(NewChangesContext);
    const {dispatch} = newChangesFlag;
    const {addToast} = useToasts();

    const handleInputChanges = () => {
        setNewUserEmail(document.getElementById("newUserEmail").value);
        setNewUserPassword(document.getElementById("newUserPassword").value);
    };

    //Adding user to user list
    const addUserToList = () => {
        const collectionRef = firebase.firestore().collection('users');
        collectionRef.doc(`${newUserEmail.split('@')[0]}`).set({
            name: `${newUserEmail.split('@')[0]}`,
        });
    };

    //Adding new field to all product documents depending on new user email
    const itemsCollection = firebase.firestore().collection("products");
    const bulkUpdate = async () => {
        const limit = 50;
        let allItemsResult = await itemsCollection.limit(limit).get();
        let read = allItemsResult.docs.length;

        while (read > 0) {
            const batch = firebase.firestore().batch();

            allItemsResult.docs.forEach((queryResult) => {
                const doc = queryResult.data();

                if (!doc.dateUnix) {

                    batch.update(queryResult.ref, {
                        [newUserEmail.split('@')[0]]: "0"
                    })
                }
            });

            await batch.commit();

            const lastVisible = allItemsResult.docs[read - 1];
            allItemsResult = await itemsCollection
                .startAfter(lastVisible)
                .limit(limit)
                .get();
            read = allItemsResult.docs.length
        }
    };


    const createUser = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(() => console.log("Adding user failed"))
            .then((onFul) => {
                if (onFul !== undefined) {
                    dispatch({
                        type: "setUserIsCreatedFlag"
                    });
                    addToast("User added", {
                        appearance: `success`,
                        autoDismiss: true
                    });
                    bulkUpdate();
                    addUserToList()
                } else addToast("Adding user failed", {
                    appearance: `error`,
                    autoDismiss: true
                });
            })
    };

    return (
        <>
            {(newChangesFlag.state.addUserFlag === true) &&
            <>
                <h3>ADD USER</h3>
                <input className="input-centered-block" type="email" placeholder="   New user email" id="newUserEmail"
                       onChange={() => handleInputChanges()}>
                </input>
                <input className="input-centered-block" placeholder="   New user password" id="newUserPassword"
                       onChange={() => handleInputChanges()}>
                </input>
                <button
                    className="button-green-wide"
                    onClick={() => createUser(newUserEmail, newUserPassword)}>
                    Create New User
                </button>
            </>
            }
        </>
    )
};