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
                <div class="header">
                    <img class="logo" src="2.png"/>
                    <h1 class="title">Nashville Furry Friends </h1>
                </div>
                    <h5>Helping foster dogs find their furever homes since 2022</h5> 
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