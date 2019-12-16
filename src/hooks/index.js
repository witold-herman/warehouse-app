// import React, { useState, useEffect } from 'react';
// import { firebase } from '../firebase';
// import {CategoriesContext} from "../context/CategoriesContext";
//
// export const useCategories = (id) => {
//     const [categories, setCategories] = useState(null);
//
//     // useEffect(() => {
//     //     firebase
//     //         .firestore()
//     //         .collection('categories')
//     //         .orderBy('categoryId')
//     //         .get()
//     //         .then(snapshot => {
//     //             const allCategories = snapshot.docs.map(category => ({
//     //                 ...category.data(),
//     //                 docId: category.id,
//     //             }));
//     //
//     //             if (JSON.stringify(allCategories) !== JSON.stringify(categories)) {
//     //                 setCategories(allCategories);
//     //             }
//     //         });
//     // }, [categories]);
//
//     // return { categories: categories, setCategories: setCategories };
//
//     useEffect(
//         () => {
//             const unsubscribe = firebase
//                 .firestore()
//                 .collection('categories')
//                 .doc(id)
//                 .onSnapshot(
//                     doc => {
//                         console.log(doc);
//                         setCategories(doc)
//                     },
//                 );
//
//             return () => unsubscribe()
//         },
//         [id]
//     );
//     return (
//
//         <CategoriesContext.Provider value={categories}>
//
//          </CategoriesContext.Provider>);
// };
