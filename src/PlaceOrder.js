import React, {useContext, useEffect, useState} from 'react';
import {NewChangesContext} from "./NewChangesContext";
import firebase from 'firebase';
import {useToasts} from "react-toast-notifications";

export const PlaceOrder = (props) => {
    const [user] = useState(props.user);
    const flags = useContext(NewChangesContext);
    const {dispatch} = flags;
    let [products, setProducts] = useState(props.products.map(element => {
        return element.name;
    }));
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    let [productsToOrder, setProductsToOrder] = useState([]);
    const [productDeleted, setProductDeleted] = useState(false);
    const {addToast} = useToasts();

    const handleChanges = event => {
        setSearchTerm(event.target.value);
    };

    const handleAddToOrderClick = (e) => {
        if (!productsToOrder.includes(e)) {
            productsToOrder.push(e);

            dispatch({
                type: "addedToOrder"
            })
        }
    };

    const deleteElement = (e) => {
        productsToOrder.splice(e.target.id, 1);
        setProductDeleted(!productDeleted);
    };

    const submitOrder = () => {
        let newOrder = {
            user: user.state.username,
        };
        productsToOrder.forEach(e => {
            document.getElementById(e).value === "" ? newOrder[e] = 0 : newOrder[e] = document.getElementById(e).value;
        });
        const collectionRef = firebase.firestore().collection("orders");
        collectionRef.doc(`${user.state.username}`).set(newOrder, {merge: true})
            .then(() => setProductsToOrder([]))
            .then(() => addToast("Order placed successfully", {
                appearance: `success`,
                autoDismiss: true
            }))
            .then(() => {
                dispatch({
                    type: 'orderPlaced'
                })
            })

    };

    useEffect(() => {
        setProducts(props.products.map(e => {
            return e.name;
        }));
        let results = products.filter(product =>
            product.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, props.products, flags.state.newChangesFlag, props.addProductFlag, productDeleted]);

    return (
        <>
            {
                (flags.state.placeOrderNav === true) &&
                <div>
                    <h3>PLACE ORDER</h3>
                    <input className="input-standard" type='text' placeholder="   Search by name" value={searchTerm}
                           onChange={handleChanges}>

                    </input>
                    <table className='table table-bordered table-striped table-dark table-hover' id="table">
                        <thead>
                        <tr>
                            <th>
                                Search result
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map(item => (
                            <tr onClick={() => handleAddToOrderClick(item)} value={item}>{item}</tr>
                        ))}
                        </tbody>
                    </table>
                    {(productsToOrder.length !== 0) &&
                    <>
                        <table className='table table-bordered table-striped table-dark table-hover align-items-center'
                               id="table">
                            <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Amount
                                </th>
                                <th>

                                </th>
                            </tr>
                            </thead>
                            {productsToOrder.map((e) => {
                                return (
                                    <tr>
                                        <td>{e}</td>
                                        <td><input className="input-standard" id={e} placeholder="   Amount"
                                                   type="number"/>
                                        </td>
                                        <td>
                                            <button className="button-red" id={`${productsToOrder.indexOf(e)}`}
                                                    onClick={deleteElement}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </table>

                        <div>
                            <button className="button-green-wide" onClick={submitOrder}>
                                Submit order
                            </button>
                        </div>
                    </>
                    }
                </div>
            }
        </>
    );

};