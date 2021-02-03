import React from "react";
import {CategoriesProvider} from "./ProductsContext";

export function SortingHelpers(products, context, flag, userContext, sortParam) {

    let currentUser = userContext;
    const {dispatch} = context;
    switch (sortParam) {
        case "byId":
            if (flag) {
                products.sort((a, b) => (+b.categoryId > +a.categoryId) ? 1 : -1);
            } else {
                products.sort((a, b) => (+a.categoryId > +b.categoryId) ? 1 : -1);
            }
            break;
        case "byName" :
                if (flag) {
                    products.sort((a,b) => (b.name > a.name) ? 1 : -1);
                } else {
                    products.sort((a,b) => (a.name > b.name) ? 1 : -1);
                }
                break;
        case "byAmount":
            if (flag) {
                products.sort((a,b) => (+b[currentUser]> +a[currentUser]) ? 1 : -1);
            } else {
                products.sort((a,b) => (+a[currentUser]> +b[currentUser]) ? 1 : -1);
            }
            break;
        default:
           console.log("Error while sorting.")
    }

    dispatch({
        type: "setSortFlag"
    });

    return (
        <CategoriesProvider value={products}/>
    )
}


