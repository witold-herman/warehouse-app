import React from "react";
import ReactDOM from "react-dom";

import { Login } from "../Login";
import {ToastProvider} from 'react-toast-notifications'

test("Renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<ToastProvider><Login/></ToastProvider>, root);
    ReactDOM.unmountComponentAtNode(root);
});