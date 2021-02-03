import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from "./UserContext";
import {CategoriesProvider} from "./ProductsContext";
import {NewChangesProvider} from "./NewChangesContext";
import {UserListProvider} from "./UserListContext";


const app = (
        <UserProvider>
            <NewChangesProvider>
                <CategoriesProvider>
                    <UserListProvider>
                        <App/>
                    </UserListProvider>
                </CategoriesProvider>
            </NewChangesProvider>
        </UserProvider>
);

ReactDOM.render(app, document.getElementById('root'));
