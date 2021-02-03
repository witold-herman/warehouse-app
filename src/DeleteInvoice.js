import React, {useContext} from 'react';
import {firebase} from "./firebase"
import {NewChangesContext} from "./NewChangesContext";
import {ProductsContext} from "./ProductsContext";
import {useToasts} from "react-toast-notifications";

export const DeleteInvoice = (props) => {
    const changesFlags = useContext(NewChangesContext);
    const {dispatch} = changesFlags;
    const products = useContext(ProductsContext);
    const {addToast} = useToasts();

    const deleteInvoice = () => {
        firebase.firestore().collection("invoices").doc(`${props.invoiceId}`).delete()
            .then(() => {
                dispatch({
                    type: "setInvoiceDeletedFlag"
                })
            });
        Object.keys(props.invoice).forEach(function (key) {
            let tempValue = 0;
            // contractor value (CK) - props.invoice[key]           contractor - key
            products[0].forEach(productObj => {
                if (key === productObj.key) {
                    tempValue = +productObj[`${props.invoice.user}`] - +props.invoice[`${key}`]
                    firebase.firestore().collection('products').doc(`${key}`).update(
                        {
                            [props.invoice.user]: tempValue.toString()
                        }
                    )
                        .then(() => addToast("Invoice deleted", {
                            appearance: `info`,
                            autoDismiss: true
                        }))
                        .then(() => {
                            dispatch({
                                type: "setFlag"
                            })
                        })
                }
            })
        });
    };

    return (
        <>
            <td>
                <button className="button-red" onClick={deleteInvoice}>Delete</button>
            </td>
        </>
    )
};