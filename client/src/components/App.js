import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Register from "./register/Register";
import Login from "./login/Login";
import Footer from "./common/Footer";
import Account from "./account/Account";
import Restaurants from "./restaurants/Restaurants";
import Recipes from "./recipes/Recipes";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from 'react-redux';
import { setCurrentUser, logOutUser } from "../redux/actions/action";

const App = ({
    setCurrentUser,
    logOutUser
}) => {
    useEffect(() => {
        if (localStorage.jwtToken) {
            // Set auth token header auth
            const token = localStorage.jwtToken;
            setAuthToken(token);
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            // Set user and isAuthenticated
            setCurrentUser(decoded);
            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds
            if (decoded.exp < currentTime) {
                console.log("true");
                logOutUser();
                window.location.href = "/";
            }
        }
    }, [setCurrentUser, logOutUser]);
    return (
        <>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/restaurants" component={Restaurants} />
                <PrivateRoute exact path="/recipes" component={Recipes} />
                <PrivateRoute exact path="/account" component={Account} />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
            />
        </>
    );
}

const mapDispatchToProps = {
    logOutUser: logOutUser,
    setCurrentUser: setCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
