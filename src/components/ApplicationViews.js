import React from "react"
import { Route } from "react-router-dom"
import { DogList } from "../dogs/DogList"
import { DogProfile } from "../dogs/DogProfile"
import { EditDogProfile } from "../dogs/EditDogProfile"
import { AddDog } from "../dogs/NewDogForm"
import { EventList } from "../events/EventsList"
import { EditUserProfile } from "../users/EditUserProfile"
import { UserProfile } from "../users/UserProfile"

//This is a Controller Component. Its only responsibility is to determine which view of the application should be rendered 

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/user-profile/:userId(\d+)">
                <UserProfile />
            </Route>

            <Route path="/edit-user-profile/:userId(\d+)">
                <EditUserProfile />
            </Route>

            <Route path="/edit-dog-profile/:dogId(\d+)">
                <EditDogProfile />
            </Route>

            <Route exact path="/all-dogs">
                <DogList />
            </Route>

            <Route exact path="/events">
                <EventList />
            </Route>

            <Route path="/dog-profile/:dogId(\d+)">
                <DogProfile />
            </Route>

            <Route path="/add-dog">
                <AddDog />
            </Route>

        </>
    )
}