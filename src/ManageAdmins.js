import React, {useContext, useEffect, useState} from 'react';
import {UserListContext} from "./UserListContext";
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";
import {useToasts} from "react-toast-notifications";

export const ManageAdmins = () => {
    const [userList] = useContext(UserListContext);
    const [adminList, setAdminList] = useState([]);

    const categoryRef = firebase.firestore().collection("admins");
    const [statusChanged, setStatusChanged] = useState(false);
    const flags = useContext(NewChangesContext);
    const {addToast} = useToasts();

    const setToAdmin = (e) => {
        categoryRef.doc(e.target.id).set({});
        setStatusChanged(!statusChanged);
        addToast("User is now Admin", {
            appearance: `info`,
            autoDismiss: true
        })
    };

    const setToUser = e => {
        categoryRef.doc(e.target.id).delete();
        setStatusChanged(!statusChanged);
        addToast("User is no longer an Admin", {
            appearance: `info`,
            autoDismiss: true
        })
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
            .then(() => setAdminList(posts))
    }, [statusChanged, userList]);

    return (
        <>
            {(flags.state.manageAdminsNav === true) &&
            <>
                <h3>MANAGE ADMINS</h3>
                <table className='table table-bordered table-striped table-dark table-hover' id="table">
                    <thead>
                    <tr>
                        <th className="fixed-width">User</th>
                        <th className="fixed-width">Is admin</th>
                        <th className="fixed-width">Change status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map(d => {
                        return (
                            <tr>
                                <td>{d}</td>
                                {(adminList.includes(d)) &&
                                <>
                                    <td>Yes</td>
                                    <td>
                                        <button className="button-red" id={`${d}`} onClick={setToUser}>Change</button>
                                    </td>
                                </>
                                }
                                {(!adminList.includes(d)) &&
                                <>
                                    <td>No</td>
                                    <td>
                                        <button className="button-green" id={`${d}`} onClick={setToAdmin}>Change
                                        </button>
                                    </td>
                                </>
                                }
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </>
            }
        </>
    );
};