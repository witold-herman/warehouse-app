// import React, { useEffect, useState } from "react";
// import {firebase} from "./firebase";
//
// export const AuthContext = React.createContext();
//
// export const AuthProvider = ({ children, currentUser }) => {
//
//     useEffect(() => {
//         firebase.auth().onAuthStateChanged(currentUser);
//         console.log('success', currentUser);
//     }, [currentUser]);
//
//     return (
//         <AuthContext.Provider
//             value={{
//                 currentUser
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
