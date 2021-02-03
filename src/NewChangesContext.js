import React, {createContext, useReducer} from 'react';

const initialState = {
    newChangesFlag: false,
    sortFlag: false,
    addProductFlag: false,
    productsFlag: false,
    addUserFlag: false,
    userIsCreatedFlag: false,
    invoiceDeletedFlag: false,
    invoiceAddedFlag: false,
    placeOrderNav: false,
    addedToOrder: false,
    orderPlaced: false,
    showOrdersNav: false,
    transferSubmitted: false,
    transferProductsNav: false,
    manageAdminsNav: false,
    addedToInvoice: false,
    invoicesNav: false,
    addInvoiceNav: false
};

export const NewChangesContext = createContext(initialState);

export const {Provider} = NewChangesContext;

export const NewChangesProvider = ({children}) => {

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'setFlag':
                return ({...state, newChangesFlag: !state.newChangesFlag});
            case 'setSortFlag':
                return ({...state, sortFlag: !state.sortFlag});
            case 'setProductFlag':
                return ({...state, addProductFlag: !state.addProductFlag});
            case 'setProductsFlag':
                return ({...state, productsFlag: !state.productsFlag});
            case 'setInvoiceDeletedFlag':
                return ({...state, invoiceDeletedFlag: !state.invoiceDeletedFlag});
            case 'setInvoiceAddedFlag':
                return ({...state, invoiceAddedFlag: !state.invoiceAddedFlag});
            case 'setAddUserFlag':
                return ({...state, addUserFlag: !state.addUserFlag});
            case 'setUserIsCreatedFlag':
                return ({...state, userIsCreatedFlag: !state.userIsCreatedFlag});
            case 'showPlaceOrder':
                return ({...state, placeOrderNav: !state.placeOrderNav});
            case 'addedToOrder':
                return ({...state, addedToOrder: !state.addedToOrder});
            case 'orderPlaced':
                return ({...state, orderPlaced: !state.orderPlaced});
            case 'showOrders':
                return ({...state, showOrdersNav: !state.showOrdersNav});
            case 'submitTransfer':
                return ({...state, transferSubmitted: !state.transferSubmitted});
            case 'showTransferProducts':
                return ({...state, transferProductsNav: !state.transferProductsNav});
            case 'showManageAdmins':
                return ({...state, manageAdminsNav: !state.manageAdminsNav});
            case 'addedToInvoice':
                return ({...state, addedToInvoice: !state.addedToInvoice});
            case 'showInvoices':
                return ({...state, invoicesNav: !state.invoicesNav});
            case 'showAddInvoice':
                return ({...state, addInvoiceNav: !state.addInvoiceNav});
            case 'logout':
                return ({
                    ...state,
                    newChangesFlag: false,
                    sortFlag: false,
                    addProductFlag: false,
                    productsFlag: false,
                    addUserFlag: false,
                    userIsCreatedFlag: false,
                    invoiceDeletedFlag: false,
                    invoiceAddedFlag: false,
                    placeOrderNav: false,
                    addedToOrder: false,
                    orderPlaced: false,
                    showOrdersNav: false,
                    transferSubmitted: false,
                    transferProductsNav: false,
                    manageAdminsNav: false,
                    addedToInvoice: false,
                    invoicesNav: false,
                    addInvoiceNav: false
                });
            default:
                throw new Error();
        }
    }, initialState);
    return (
        <Provider value={{state, dispatch}}>
            {children}
        </Provider>
    )
};
