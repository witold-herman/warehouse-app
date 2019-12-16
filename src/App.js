import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import Login from './components/layout/Login';
import {firebase} from './firebase.js'
import PrivateRoute from './PrivateRoute';
import LoggedUserPrivateRoute from "./components/LoggedUserPrivateRoute";
import {UserContext} from "./context/UserContext";
import {Content} from "./components/layout/Content";


export const App = (() => {
        const [user, setUser] = useState('');

        useEffect(() => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    setUser(user)
                }
            });
        });

        return (
            <Router>
                <UserContext.Provider value={user}>
                    <div className="app">
                        <Switch>
                            <PrivateRoute path="/" exact component={Content}/>
                            <LoggedUserPrivateRoute path="/login" exact component={Login}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                </UserContext.Provider>
            </Router>
        );

}
);

const NoMatch = ({location}) => <div>No route match for {location.pathname}</div>;

// const App = () => {
//     return (
// <AuthProvider>
//             <Router>
//                 <Switch>
//                     <ProtectedRoute exact path="/" component={NavigationBar} />
//                     <Route exact path="/login" component={Login} />
//                 </Switch>
//             </Router>
// </AuthProvider>
//
//     );
// };
//
export default App;
