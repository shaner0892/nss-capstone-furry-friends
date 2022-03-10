import React from "react"
import { Route } from "react-router-dom"
import { DogList } from "../dogs/DogList"
import { DogProfile } from "../dogs/DogProfile"
import { UserProfile } from "../users/UserProfile"

//This is a Controller Component. Its only responsibility is to determine which view of the application should be rendered 

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/user-profile/:userId(\d+)">
                <UserProfile />
            </Route>

            <Route exact path="/all-dogs">
                <DogList />
            </Route>

            <Route path="/all-dogs/:dogId(\d+)">
                <DogProfile />
            </Route>

        </>
    )
}