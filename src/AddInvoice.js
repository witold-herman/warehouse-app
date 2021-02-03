import React, {useContext, useEffect, useState} from 'react';
import {firebase} from "./firebase"
import {NewChangesContext} from "./NewChangesContext";
import {UserListContext} from "./UserListContext";
import {useToasts} from 'react-toast-notifications';
import {UserContext} from "./UserContext";

export const AddInvoice = (props) => {
    const changesFlags = useContext(NewChangesContext);
    const {dispatch} = changesFlags;
    const [userList] = useContext(UserListContext);
    const [contractor, setContractor] = useState("");
    const [date, setDate] = useState("");
    const [number, setNumber] = useState("");
    const user = useContext(UserContext);

    let [products, setProducts] = useState(props.products.map(element => {
        return ([element.name, element.key]);
    }));
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    let [productsToAddToInvoice, setProductsToAddToInvoice] = useState([]);
    const [productDeleted, setProductDeleted] = useState(false);
    const [userInvoice, setUserInvoice] = useState(props.user.state.username.split("@")[0]);

    const {addToast} = useToasts();

    const handleFromMenuChange = () => {
        setUserInvoice(document.getElementById("fromUserMenu").value)
    };

    const deleteElement = (e) => {
        productsToAddToInvoice.splice(e.target.id, 1);
        setProductDeleted(!productDeleted);
    };

    const handleChanges = event => {
        setSearchTerm(event.target.value);
    };

    const handleAddToInvoice = (e) => {
        if (!productsToAddToInvoice.includes(e)) {
            productsToAddToInvoice.push(e);

            dispatch({
                type: "addedToOrder"
            })
        }
    };

    const addInvoice = (event) => {
        let newInvoice = {
            contractor: contractor,
            date: date,
            number: number,
            user: userInvoice,
        };
        productsToAddToInvoice.forEach(e => {
            document.getElementById(e[1]).value === "" ? newInvoice[e[0]] = 0 : newInvoice[e[0]] = document.getElementById(e[1]).value;
        });
        event.preventDefault();
        firebase.firestore().collection("invoices").add(newInvoice)
            .then(() => addToast("Invoice added", {
                appearance: `success`,
                autoDismiss: true
            }));


        productsToAddToInvoice.forEach(element => {
            let tempValue = 0;
            props.products.forEach(e => {
                Object.keys(e).forEach(function (key) {
                    if (e[key] === element[1]) {
                        tempValue = e[`${userInvoice}`];
                    }
                })
            });
            tempValue = +tempValue + +document.getElementById(element[1]).value;
            firebase.firestore().collection("products").doc(`${element[1]}`).update({
                [userInvoice]: tempValue.toString()
            })
                .then(() => {
                    dispatch({
                        type: "setFlag"
                    })
                })
                .then(() => {
                    dispatch({
                        type: "setInvoiceAddedFlag"
                    })
                })
        });

        setProductsToAddToInvoice([]);
        document.getElementById("contractor-input").value = "";
        document.getElementById("date-input").value = "";
        document.getElementById("invoice-number-input").value = "";

    };

    useEffect(() => {
        setProducts(props.products.map(e => {
            return ([e.name, e.key]);
        }));
        let results = products.filter(product =>
            product[0].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [searchTerm, props.products, changesFlags.state.newChangesFlag, productDeleted]);

    return (

        <>
            {
                (changesFlags.state.addInvoiceNav === true) &&
                <>
                    <h3>ADD INVOICE</h3>
                    <>
                        <div>
                            <input className="input-standard" type='text' id="search-by-name" placeholder="   Search by name"
                                   value={searchTerm}
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
                                    <tr onClick={() => handleAddToInvoice(item)} value={item[0]}>{item[0]}</tr>
                                ))}
                                </tbody>
                            </table>
                            {(productsToAddToInvoice.length !== 0) &&
                            <>
                                <table
                                    className='table table-bordered table-striped table-dark table-hover align-items-center'
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
                                    {productsToAddToInvoice.map((e) => {
                                        return (
                                            <tr>
                                                <td>{e[0]}</td>
                                                <td><input className="input-standard" id={e[1]} placeholder="   Amount"
                                                           type="number"/>
                                                </td>
                                                <td>
                                                    <button className="button-red"
                                                            id={`${productsToAddToInvoice.indexOf(e)}`}
                                                            onClick={deleteElement}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </>
                            }
                        </div>

                    </>

                    <form onSubmit={addInvoice}>
                        <input required={true} className="input-centered-block" id='contractor-input'
                               type='text' placeholder="   contractor"
                               onChange={e => setContractor(e.target.value)}/>
                        <input required={true} className="input-centered-block" id='date-input' type='text'
                               placeholder="   date"
                               onChange={e => setDate(e.target.value)}/>
                        <input required={true} className="input-centered-block" id='invoice-number-input' type='text'
                               placeholder="   invoice number"
                               onChange={e => setNumber(e.target.value)}/>
                        <select className="select-centered" onChange={() => handleFromMenuChange()} id="fromUserMenu">
                            {userList.map(element => {
                                if (element === user.state.username.split("@")[0]) {
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
                        <input className="button-green-wide" type="submit" value="Add"/>
                    </form>
                </>
            }
        </>
    );
};