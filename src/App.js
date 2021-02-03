import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Login} from "./Login";
import {UserContext} from './UserContext';
import {Products} from "./Products";
import {AddProduct} from "./AddProduct";
import {CheckIfAdmin} from "./CheckIfAdmin";
import {NewChangesContext} from "./NewChangesContext";
import {Navigation} from "./Navigation";
import {ProductsContext} from "./ProductsContext";
import {SortingHelpers} from "./SortingHelpers";
import {AddUser} from "./AddUser";
import {PlaceOrder} from "./PlaceOrder";
import {Orders} from "./Orders";
import {TransferProducts} from "./TransferProducts";
import {ManageAdmins} from "./ManageAdmins";
import {Invoices} from "./Invoices";
import {AddInvoice} from "./AddInvoice";
import {ToastProvider} from 'react-toast-notifications'
import './css/content.sass'


export const App = (() => {
        const user = useContext(UserContext);
        const newChangesFlags = useContext(NewChangesContext);
        const [products] = useContext(ProductsContext);

        return (
            <>
                <ToastProvider>
                    {(user.state.isLoggedIn === false) &&
                    (
                        <>
                            <Login/>
                        </>
                    )}
                    {(user.state.isLoggedIn === true) &&
                    (
                        <>
                            <Navigation/>
                            <Products products={products} sort={SortingHelpers} context={newChangesFlags}
                                      sortFlag={newChangesFlags.state.sortFlag}
                                      userCreatedFlag={newChangesFlags.state.userIsCreatedFlag}/>
                            <PlaceOrder user={user} products={products}
                                        addProductFlag={newChangesFlags.state.newChangesFlag}/>
                            <AddProduct/>
                            <CheckIfAdmin/>
                            <AddUser/>
                            <Orders/>
                            <TransferProducts user={user} products={products}/>
                            <ManageAdmins/>
                            <Invoices/>
                            <AddInvoice user={user} products={products}/>
                        </>
                    )}
                </ToastProvider>
            </>
        );
    }
);

