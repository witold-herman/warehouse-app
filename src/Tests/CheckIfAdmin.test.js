import React from "react";
import ReactDOM from "react-dom";

import { CheckIfAdmin } from "../CheckIfAdmin";
import {ToastProvider} from 'react-toast-notifications'

test("Renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<ToastProvider><CheckIfAdmin/></ToastProvider>, root);
    ReactDOM.unmountComponentAtNode(root);
});