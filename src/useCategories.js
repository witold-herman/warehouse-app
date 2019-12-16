import React, {useEffect, useState} from 'react';
import {firebase} from "./firebase";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let posts = [];

        firebase.firestore()
            .collection('categories')
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    posts.push(doc.data());
                });
            })
            .then(() => {
                setCategories(posts)
            })
    });


    return (
        {categories}
    )
};
