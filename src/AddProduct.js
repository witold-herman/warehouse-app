import React, {useState, useContext} from 'react';
import firebase from 'firebase';
import {NewChangesContext} from "./NewChangesContext";
import {UserListContext} from "./UserListContext";
import {useToasts} from 'react-toast-notifications';

export const AddProduct = () => {
    const [newProductName, setNewProductName] = useState('');
    const [productNumber, setProductNumber] = useState('');
    let [userList] = useContext(UserListContext);
    const {addToast} = useToasts();
    let categoryInput = null;
    let nameInput = null;

    const newChangesFlag = useContext(NewChangesContext);
    const {dispatch} = newChangesFlag;

    const addProduct = (event) => {
        if (newProductName !== null && productNumber !== null &&
            newProductName !== "" && productNumber !== "") {
            let newProduct = {
                categoryId: `${productNumber}`,
                name: `${newProductName}`,
                key: `${newProductName}`
            };
            userList.forEach((element) => {
                if (document.getElementById(element).value !== "") {
                    newProduct[element] = document.getElementById(element).value;
                } else {
                    newProduct[element] = "0";
                }
            });
            event.preventDefault();
            const categoryRef = firebase.firestore().collection('products');
            categoryRef.doc(`${newProductName}`).set(newProduct)
                .then(() => addToast("Product added", {
                        appearance: `success`,
                        autoDismiss: true
                    })
                );

            categoryInput.value = "";
            nameInput.value = "";

            userList.forEach(element => {
                document.getElementById(element).value = '';
            });

            setNewProductName(null);
            setProductNumber(null);

            dispatch({
                type: "setFlag"
            })
        }
    };


    return (
        <>
            {(newChangesFlag.state.addProductFlag === true) &&
            <div>
                <h3>ADD PRODUCT</h3>
                <form onSubmit={addProduct}>
                    <input className="input-centered-block" id='categoryInput' ref={(input) => {
                        categoryInput = input
                    }} type='number' placeholder="   category number"
                           onChange={e => setProductNumber(e.target.value)}/>
                    <input className="input-centered-block" id='nameInput' ref={(input) => {
                        nameInput = input
                    }} type='text' placeholder="   name" onChange={e => setNewProductName(e.target.value)}/>
                    {userList.map(e => {
                        return (
                            <input className="input-centered-block" id={e} type='number' placeholder={"   " + e}/>
                        );
                    })}

                    <input className="button-green-wide" type='submit' value='Add'/>
                </form>
            </div>
            }
        </>
    )
}