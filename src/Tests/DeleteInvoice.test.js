import React from "react";
import ReactDOM from "react-dom";

import  {DeleteInvoice} from "../DeleteInvoice";
import {ToastProvider} from 'react-toast-notifications'


test("Renders without crashing", () => {

    const root = document.createElement("div");
    ReactDOM.render(<ToastProvider><DeleteInvoice/></ToastProvider>, root);
    ReactDOM.unmountComponentAtNode(root);
});

test("Renders correct button", () => {
    const root = document.createElement("div");
    ReactDOM.render(<ToastProvider><DeleteInvoice/></ToastProvider>, root);
    expect(root.querySelector("button").textContent).toBe("Delete");
    ReactDOM.unmountComponentAtNode(root);
});