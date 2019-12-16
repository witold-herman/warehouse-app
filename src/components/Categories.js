import React, {useEffect, useState} from 'react';
import {firebase} from "../firebase";
import {useCategories} from  '../useCategories';

const Categories = () => {
    const {categories} = useCategories();
    const [displayCategories, setDisplayCategories] = useState([]);

    useEffect (() =>  {
        setDisplayCategories(categories.map((d) => {
            return (
                <tr>
                    <td>{d.categoryId}</td>
                    <td>{d.name}</td>
                    <td>{d.userId}</td>
                </tr>
            );
        }));
    }, [categories]);


        return (
            <div className="table-responsive">
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Category Id</th>
                        <th>Name</th>
                        <th>User Id</th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayCategories}
                    </tbody>
                </table>
            </div>
        )
};

export default Categories;

// import React from 'react';
// import {firebase} from "../firebase";
//
// class Categories extends React.Component {
//     _isMounted = false;
//
//     constructor(props) {
//         super(props);
//         this.state = {categories: [0, 1]};
//     }
//
//     componentDidMount() {
//         this._isMounted = true;
//         let posts = [];
//
//         firebase.firestore()
//             .collection('categories')
//             .get()
//             .then((data) => {
//                 if (this._isMounted) {
//                     data.forEach((doc) => {
//                         posts.push(doc.data());
//                     });
//                 }
//                 this.setState({
//                     categories: posts
//                 })
//             })
//     }
//
//     componentWillUnmount() {
//         this._isMounted = false;
//     }
//
//     render() {
//         const arr = this.state.categories.map((d) => {
//             return (
//             <tr>
//                 <td>{d.categoryId}</td>
//                 <td>{d.name}</td>
//                 <td>{d.userId}</td>
//             </tr>
//             )
//         });
//         console.log(arr);
//         return (
//             <div className="table-responsive">
//                 <table className='table'>
//                     <thead>
//                         <tr>
//                             <th>Category Id</th>
//                             <th>Name</th>
//                             <th>User Id</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                       {arr.sort()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }
//
// export default Categories;

