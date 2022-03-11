import React from "react"
import { Route, Redirect } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

//this is what is rendered in the DOM

export const FurryFriends = () => (
    <>
    <Route
        render={() => {
            if (localStorage.getItem("furry_user")) {
                return (
                <>
                    <h1>Nashville Furry Friends </h1>
                    <h4>Helping foster dogs find their furever homes since 2022</h4>                  
                    <NavBar />
                    <ApplicationViews />
                </>
                );
            } else {
                return <Redirect to="/login" />;
            }
        }}
    />

    <Route path="/login">
        <Login />
    </Route>
    <Route path="/register">
        <Register />
    </Route>
    </>
)