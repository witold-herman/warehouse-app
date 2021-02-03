import React, {useContext, useEffect, useState} from 'react';
import {ProductsContext} from "./ProductsContext";
import {UserContext} from "./UserContext";
import {firebase} from "./firebase";
import {NewChangesContext} from "./NewChangesContext";
import {DeleteProduct} from "./DeleteProduct";
import {UserList} from "./UserList";
import {EditProduct} from "./EditProduct";
import Table from 'react-bootstrap/Table'


export const Products = (props) => {
    const [products, setProducts] = useState(props.products);
    const currentUser = useContext(UserContext);
    let flag = useContext(NewChangesContext);

    let [chosenUser, setChosenUser] = useState(currentUser.state.username.split('@')[0]);

    let sort = (param) => {
        props.sort(props.products, props.context, props.sortFlag, chosenUser, param);
    };

    //Callback to get list
    const userChangedCallback = (chosenUser) => {
        setChosenUser(chosenUser);
    };
    // Used to rerender after sorting
    useEffect(() => {
        setProducts(props.products);
    }, [props.sortFlag, props.products, chosenUser, flag.state.userIsCreatedFlag,
        flag.state.transferSubmitted]);


    return (
        <>
            {(flag.state.productsFlag === true && currentUser.state.isAdmin === true) &&
            <>
                <h3>PRODUCTS</h3>
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Category Id<i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byId")}/></th>
                        <th>Name<i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byName")}/></th>
                        <th>Amount<i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byAmount")}/></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(d => {
                        return (
                            <tr>
                                <td>{d.categoryId}</td>
                                <td>{d.name}</td>
                                <td>{d[chosenUser]}</td>
                                <td><EditProduct name={d}/></td>
                                <DeleteProduct productKey={d.key}/>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                <UserList parentGetUserCallback={userChangedCallback}/>
            </>
            }
            {(flag.state.productsFlag === true && currentUser.state.isAdmin === false) &&
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Category Id<i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byId")}/></th>
                    <th>Name <i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byName")}/></th>
                    <th>Amount <i className="fa fa-fw fa-sort sort-icon" onClick={() => sort("byAmount")}/></th>
                </tr>
                </thead>
                <tbody>
                {products.map(d => {
                    return (
                        <tr>
                            <td>{d.categoryId}</td>
                            <td>{d.name}</td>
                            <td>{d[chosenUser]}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            }
        </>
    )
};
