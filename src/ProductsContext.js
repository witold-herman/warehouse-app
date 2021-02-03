import React, {useEffect, useState, createContext, useContext} from 'react';
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";

export const ProductsContext = createContext();

export const CategoriesProvider = props => {
    const [categories, setCategories] = useState([]);
    const newChangesFlag = useContext(NewChangesContext);

    useEffect(() => {
    let posts = [];

    firebase.firestore()
        .collection('products')
        .get()
        .then((data) => {
            data.forEach((doc) => {
                posts.push(doc.data());
            });
        })
        .then(() => {
            setCategories(posts)
        })

}, [newChangesFlag.state.newChangesFlag, newChangesFlag.state.transferSubmitted]);

    return (
        <ProductsContext.Provider value = {[categories, setCategories]}>
            {props.children}
        </ProductsContext.Provider>
    )
};

