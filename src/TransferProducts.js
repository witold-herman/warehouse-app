import React, {useContext, useEffect, useState} from 'react';
import {UserListContext} from "./UserListContext";
import {NewChangesContext} from "./NewChangesContext";
import {firebase} from "./firebase";
import {useToasts} from "react-toast-notifications";

export const TransferProducts = (props) => {
    const [userList] = useContext(UserListContext);
    const [products, setProducts] = useState(props.products.map(element => {
        return (
            element.name
        )
    }));
    const [productsToTransfer, setProductsToTransfer] = useState([]);
    const [userFromTransfer, setUserFromTransfer] = useState(props.user.state.username.split("@")[0]);
    const [userToTransfer, setUserToTransfer] = useState(props.user.state.username.split("@")[0]);
    const [productDeleted, setProductDeleted] = useState(false);
    const {addToast} = useToasts();
    const [transferData, setTransferData] = useState({});

    let flags = useContext(NewChangesContext);
    const {dispatch} = flags;

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChanges = event => {
        setSearchTerm(event.target.value);
    };

    const handleFromMenuChange = () => {
        setUserFromTransfer(document.getElementById("fromUserMenu").value)
    };

    const handleToMenuChange = () => {
        setUserToTransfer(document.getElementById("toUserMenu").value)
    };

    const handleAddClick = (e) => {
        if (!productsToTransfer.includes(e)) {
            productsToTransfer.push(e);
            dispatch({
                type: "addedToOrder"
            })
        }
    };

    const deleteFromList = (e) => {
        productsToTransfer.splice(e.target.id, 1);
        setProductDeleted(!productDeleted);
    };

    const submitTransfer = () => {
        const categoryRef = firebase.firestore().collection('products');
        let docKey;

        if (userFromTransfer !== userToTransfer) {
            productsToTransfer.forEach(e => {
                props.products.forEach((el) => {
                    if (Object.values(el).indexOf(e) > -1) {
                        docKey = el;
                    }
                });
                transferData[userToTransfer] = (+(docKey[`${userToTransfer}`]) + (+(document.getElementById(`${e}value`).value))).toString();
                transferData[userFromTransfer] = (+(docKey[`${userFromTransfer}`]) - (+(document.getElementById(`${e}value`).value))).toString();

                dispatch({
                    type: 'submitTransfer'
                });

                categoryRef.doc(docKey.key).set(transferData, {merge: true})
                    .then(() => setTransferData({}))
                    .then(() => setProductsToTransfer([]));

            });
            setTransferData({});
            addToast("Transfer submitted", {
                appearance: 'success',
                autoDismiss: true
            });
        }
    };

    useEffect(() => {
        let results = products.filter(product =>
            product.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, props.products, productDeleted]);

    return (
        <>
            {
                (flags.state.transferProductsNav === true) &&
                <>
                    <h3>TRANSFER PRODUCTS</h3>
                    <div>
                        <input className="input-standard" type='text' placeholder="   Search by name"
                               value={searchTerm}
                               onChange={handleChanges}/>
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
                                <tr onClick={() => handleAddClick(item)} id={item}>{item}</tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {
                        (productsToTransfer.length > 0) &&
                        <>
                            <table className='table table-bordered table-striped table-dark table-hover' id="table">
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
                                {productsToTransfer.map(element => {
                                    return (
                                        <tr>
                                            <td>{element}</td>
                                            <td><input className="input-standard" placeholder="Amount"
                                                       id={`${element}value`} type='number'/></td>
                                            <td>
                                                <button className="button-red"
                                                        id={`${productsToTransfer.indexOf(element)}`}
                                                        onClick={deleteFromList}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    )
                                })}
                            </table>

                            <table className='table table-borderless table-striped table-dark table-hover text-center'
                                   id="table">
                                <tbody>
                                <tr>

                                    <td>
                                        <span>From  </span>
                                        <select className="select" onChange={() => handleFromMenuChange()}
                                                id="fromUserMenu">
                                            {userList.map(element => {
                                                if (element === userFromTransfer) {
                                                    return (
                                                        <option selected="selected" value={element}> {element} </option>
                                                    )
                                                } else {
                                                    return (
                                                        <option value={element}> {element} </option>
                                                    )
                                                }
                                            })}>
                                        </select>
                                        <span>  to  </span>
                                        <select className="select" onChange={() => handleToMenuChange()}
                                                id="toUserMenu">
                                            {userList.map(element => {
                                                if (element === userToTransfer) {
                                                    return (
                                                        <option selected="selected" value={element}> {element} </option>
                                                    )
                                                } else {
                                                    return (
                                                        <option value={element}> {element} </option>
                                                    )
                                                }
                                            })}>
                                        </select>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="button-green-wide" onClick={() => submitTransfer()}>Submit</button>
                        </>
                    }


                </>
            }
        </>
    )
};