import React, {useContext} from 'react';
import {NewChangesContext} from "./NewChangesContext";
import {UserContext} from "./UserContext";
import {Logout} from "./Logout";

export const Navigation = () => {

    const changesContext = useContext(NewChangesContext);
    const {dispatch} = changesContext;
    const userContext = useContext(UserContext);

    let showAddProduct = () => {
        dispatch({
            type: "setProductFlag"
        })
    };
    let showProducts = () => {
        dispatch({
            type: "setProductsFlag"
        })
    };
    let showAddUser = () => {
        dispatch({
            type: "setAddUserFlag"
        })
    };

    let showPlaceOrder = () => {
        dispatch({
            type: "showPlaceOrder"
        })
    };

    let showOrders = () => {
        dispatch({
            type: "showOrders"
        })
    };

    let showTransferProducts = () => {
        dispatch({
            type: "showTransferProducts"
        })
    };

    let showManageAdmins = () => {
        dispatch({
            type: "showManageAdmins"
        })
    };

    let showInvoices = () => {
        dispatch({
            type: "showInvoices"
        })
    };

    let showAddInvoice = () => {
        dispatch({
            type: "showAddInvoice"
        })
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand text-uppercase ml-4 text-white" href="#"><Logout/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            {(userContext.state.isAdmin === false) &&
            <>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li>
                            <a className=" text-white text-uppercase ml-4 navbar-hover" href="#"
                               onClick={() => showProducts()}>Products</a>
                        </li>
                        <li>
                            <a className=" text-white text-uppercase ml-4 navbar-hover" href="#"
                               onClick={() => showPlaceOrder()}>Place order</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showOrders()}>Orders</a>
                        </li>
                    </ul>
                </div>
            </>
            }
            {(userContext.state.isAdmin === true) &&
            <>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li>
                            <a className=" text-white text-uppercase ml-4 navbar-hover" href="#"
                               onClick={() => showProducts()}>Products</a>
                        </li>
                        <li>
                            <a className="n text-white text-uppercase ml-4 navbar-hover" href="#"
                               onClick={() => showPlaceOrder()}>Place order</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showOrders()}>Orders</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showAddProduct()}>Add product</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showAddUser()}>Add User</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showTransferProducts()}>Transfer products</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showManageAdmins()}>Manage admins</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showInvoices()}>Invoices</a>
                        </li>
                        <li>
                            <a className=" text-uppercase ml-4 text-white navbar-hover" href="#"
                               onClick={() => showAddInvoice()}>Add invoice</a>
                        </li>
                    </ul>


                </div>
            </>
            }
        </nav>
    )

};