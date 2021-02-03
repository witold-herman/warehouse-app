import React, {useContext, useEffect, useState} from 'react';
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";
import {UserContext} from "./UserContext";
import {useToasts} from "react-toast-notifications";

export const Orders = () => {
    const currentUser = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const flags = useContext(NewChangesContext);
    const orderPlacedFlag = useState(flags.orderPlaced);
    const {dispatch} = flags;
    const {addToast} = useToasts();

    const deleteOrder = (documentId) => {
        firebase.firestore().collection('orders').doc(`${documentId}`).delete()
            .then(() => {
                dispatch({
                    type: "setFlag"
                })
            })
            .then(() => addToast("Order deleted", {
                appearance: `info`,
                autoDismiss: true
            }))
    };

     const useOrdersFetchEffect =  ()  => {
        let posts = [];

        const ordersSetter = (data) => {
            setOrders(data)
        };

        useEffect(() => {

            firebase.firestore()
                .collection('orders')
                .get()
                .then((data) => {
                    data.forEach((doc) => {
                        posts.push(doc.data());
                    });
                })
                .then(() => {
                    ordersSetter(posts)
                })
        }, [flags.state.newChangesFlag ,orderPlacedFlag]);
    };
    useOrdersFetchEffect();

    return (
        <>
            {
                (flags.state.showOrdersNav === true) &&
                <>
                    <h3>ORDERS</h3>
                    {
                        (currentUser.state.isAdmin &&
                            <>
                                {Object.values(orders).map(e => {
                                    return (
                                        <>
                                            <table
                                                className='table table-bordered table-striped table-dark table-hover'>
                                                <thead>
                                                <tr>
                                                    <th className="fixed-width">New Order!</th>
                                                    <th className="fixed-width">Product name</th>
                                                    <th className="fixed-width">Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Object.keys(e).map(element => {
                                                    return (
                                                        <tr>
                                                            <td></td>
                                                            <td>{element}</td>
                                                            <td>{e[element]}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                            <button className="button-green-wide"
                                                    onClick={() => deleteOrder(e['user'])}>Order
                                                fulfilled
                                            </button>
                                        </>
                                    )
                                })}
                            </>
                        )}
                    {
                        (!currentUser.state.isAdmin) &&
                        <>
                            {Object.values(orders).map(e => {
                                if (e["user"] === currentUser.state.username) {
                                    return (
                                        <>
                                            <h1 className="centered-h1">Your order</h1>
                                            <table
                                                className='table table-bordered table-striped table-dark table-hover'>
                                                <thead>
                                                <tr>
                                                    <th>Product name</th>
                                                    <th>Amount</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Object.keys(e).map(element => {
                                                    return (
                                                        <tr>
                                                            <td>{element}</td>
                                                            <td>{e[element]}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                            <button className="button-green-wide"
                                                    onClick={() => deleteOrder(e['user'])}>Cancel order
                                            </button>
                                        </>
                                    )
                                }
                            })}
                        </>
                    }
                </>
            }
        </>
    )
};