import React from "react";
import {Redirect, Route} from "react-router-dom";
import firebase from 'firebase';

function LoggedUserPrivateRoute({component: RouteComponent}) {

    return (
        <Route
            render={() =>
                firebase.auth().currentUser ? (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                ) : (
                    <RouteComponent />
                )
            }
        />
    );
}


export default LoggedUserPrivateRoute

