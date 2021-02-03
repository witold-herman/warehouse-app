import React from "react";
import ReactDOM from "react-dom";

import {DeleteProduct} from "../DeleteProduct";
import {ToastProvider} from 'react-toast-notifications'
import {UserProvider} from "../UserContext";

test("Renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(
        <ToastProvider>
            <UserProvider isAdmin={true}>
                <DeleteProduct/>
            </UserProvider>
        </ToastProvider>, root);
    ReactDOM.unmountComponentAtNode(root);
});

