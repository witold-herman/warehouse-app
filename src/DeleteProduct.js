import React, {useContext, useEffect} from 'react';
import {NewChangesContext} from "./NewChangesContext";
import {firebase} from "./firebase";
import {UserContext} from "./UserContext";
import { useToasts } from 'react-toast-notifications'

export const DeleteProduct = (props) => {
    const { addToast } = useToasts();
    const newChangesFlag = useContext(NewChangesContext);
    const {dispatch} = newChangesFlag;
    const user = useContext(UserContext);

    const deleteProduct = () => {
        firebase.firestore().collection('products').doc(`${props.productKey}`).delete()
            .then(() => {
                dispatch({
                    type: "setFlag"
                })
            })
            .then(() => addToast("Product deleted", {
                appearance: `info`,
                autoDismiss: true
            }))
    };

    return (
        <>
            {(user.state.isAdmin === true) &&
            <td>
                <button className="button-red" onClick={deleteProduct}>Delete</button>
            </td>
            }
        </>
    );
};
