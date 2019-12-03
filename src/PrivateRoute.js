import React from "react";
import {Redirect, Route} from "react-router-dom";
import firebase from 'firebase';

function PrivateRoute({component: RouteComponent}) {
    return (
        <Route
            render={() =>
                firebase.auth().currentUser ? (
                    <RouteComponent/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}


export default PrivateRoute

// import React, { useContext } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "./Auth";
//
// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//     const {currentUser} = useContext(AuthContext);
//     return (
//         <Route
//             {...rest}
//             render={routeProps =>
//                 !!currentUser ? (
//                     <RouteComponent {...routeProps} />
//                 ) : (
//                     <Redirect to={"/login"} />
//                 )
//             }
//         />
//     );
// };
//
//
// export default PrivateRoute
