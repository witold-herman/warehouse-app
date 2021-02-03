import React, {useState, useEffect, useContext} from 'react';
import {firebase} from "./firebase";
import Table from "react-bootstrap/Table";
import {DeleteInvoice} from "./DeleteInvoice";
import {NewChangesContext} from "./NewChangesContext";

export const Invoices = (props) => {
    const [invoices, setInvoices] = useState([]);
    const changesFlags = useContext(NewChangesContext);
    const [invoicesToShow, setInvoicesToShow] = useState([]);
    const [invoiceHidden, setInvoiceHidden] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [radioValue, setRadioValue] = useState("contractor");

    const handleSearchChanges = event => {
        if (event.target.value === "") {
            setSearchTerm("")
        } else {
            setSearchTerm(event.target.value);
            let results = invoices.filter(invoice =>
                invoice[1][radioValue].toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }
    };

    const handleRadioChanges = (e) => {
        setRadioValue(e.target.value)
    };

    const handleShowInvoice = (invoiceId) => {
        invoices.forEach(e => {
            if (e.includes(`${invoiceId}`) && !invoicesToShow.includes(e[1])) {
                setInvoicesToShow(invoicesToShow.concat(e[1]));
            }
        })
    };

    const hideShownInvoice = e => {
        invoicesToShow.splice(e.target.id, 1);
        setInvoiceHidden(!invoiceHidden);
    };

    useEffect(() => {
        let posts = [];

        firebase.firestore()
            .collection('invoices')
            .get()
            .then(data => {
                data.forEach((doc) => {
                    posts.push([doc.id, doc.data()]);
                })
            })
            .then(() => setInvoices(posts))

    }, [changesFlags.state.invoiceDeletedFlag, changesFlags.state.invoiceAddedFlag, invoiceHidden])
    ;

    return (
        <>
            {(changesFlags.state.invoicesNav === true) &&
            <>
                <h3>INVOICES</h3>
                <input id="search-invoices" className="input-standard" type='text' placeholder="   Search"
                       onChange={handleSearchChanges}>
                </input>
                <div className="d-inline-block" onChange={handleRadioChanges}>
                    Search by
                    <input type="radio" className="radio-margin" name="search-by" value="contractor"/> contractor
                    <input type="radio" className="radio-margin" name="search-by" value="date"/> date
                    <input type="radio" className="radio-margin" name="search-by" value="number"/> number
                    <input type="radio" className="radio-margin" name="search-by" value="user"/> user
                </div>
                {(searchTerm === "") &&
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Contractor</th>
                        <th>Date</th>
                        <th>Number</th>
                        <th>User</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map(element => {
                        return (
                            <tr>
                                <td>{element[1].contractor}</td>
                                <td>{element[1].date}</td>
                                <td>{element[1].number}</td>
                                <td>{element[1].user}</td>
                                <DeleteInvoice invoiceId={element[0]} invoice={element[1]}/>
                                <td>
                                    <button className="button-green"
                                            onClick={() => handleShowInvoice(element[0])}>Show
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                }

                {(searchTerm !== "") &&
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Contractor</th>
                        <th>Date</th>
                        <th>Number</th>
                        <th>User</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {searchResults.map(element => {
                        return (
                            <tr>
                                <td>{element[1].contractor}</td>
                                <td>{element[1].date}</td>
                                <td>{element[1].number}</td>
                                <td>{element[1].user}</td>
                                <DeleteInvoice invoiceId={element[0]} invoice={element[1]}/>
                                <td>
                                    <button className="button-green"
                                            onClick={() => handleShowInvoice(element[0])}>Show
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                }

                {(invoicesToShow[0] !== undefined) &&
                <>
                    {invoicesToShow.map(element => {
                        return (
                            <>
                                <h1 className="centered-h1">{element.number}</h1>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                    <tr>
                                        <th className="width-50">#</th>
                                        <th className="width-50">Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Object.keys(element).map((keyName, i) => {
                                        return (
                                            <tr>
                                                <td>{keyName}</td>
                                                <td>{element[keyName]}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                <button className="button-green-wide"
                                        id={`${invoicesToShow.indexOf(element)}`}
                                        onClick={hideShownInvoice}> CLOSE
                                </button>
                            </>
                        )
                    })
                    }
                </>
                }
            </>
            }
        </>
    )
};