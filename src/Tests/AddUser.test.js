import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {AddUser} from "../AddUser";
import {ToastProvider} from "react-toast-notifications";
import {NewChangesContext, NewChangesProvider} from "../NewChangesContext";

let container = null;

beforeEach(() => {

    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {

    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders without crashing", () => {
    act(() => {
        render(
            <ToastProvider>
                <NewChangesProvider>
                    <AddUser/>
                </NewChangesProvider>
            </ToastProvider>,
            container);
    });
});
