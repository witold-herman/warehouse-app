import React, {useState} from 'react';
import firebase from 'firebase';
import {useCategories} from '../useCategories';

export const UpdatingFields = () => {
    const {categories} = useCategories();

    const updateField = () =>
    {
        categories.forEach(d => {
            const categoryRef = firebase.firestore().collection('categories').doc(`${d.name}`);
            categoryRef.set({
                test: "TEST"
            }, {merge: true});
        })
    };

    return (
        <div>
            <button onClick={updateField}>
                This is a test
            </button>
        </div>
    )
};

// import React, {useState} from 'react';
// import firebase from 'firebase';
// import Categories from './Categories';
//
// export const UpdatingFields = () => {
//     const [categories, setCategories] = useState(Categories);
//
//     const updateField = () =>
//     {
//         const categoryRef = firebase.firestore().collection('categories').doc('MOD_KIT');
//         categoryRef.set({
//             test: "TEST"
//         }, {merge: true});
//         console.log(categories)
//     };
//
//     return (
//         <div>
//             <button onClick={updateField}>
//                 This is a test
//             </button>
//         </div>
//     )
// };
