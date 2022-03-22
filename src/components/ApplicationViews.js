import React from "react"
import { Route } from "react-router-dom"
import { BlogPostList } from "../blogs/BlogPostsList"
import { EditBlogPost } from "../blogs/EditBlogForm"
import { AddBlogPost } from "../blogs/NewBlogForm"
import { DogList } from "../dogs/DogList"
import { DogProfile } from "../dogs/DogProfile"
import { EditDogProfile } from "../dogs/EditDogProfile"
import { AddDog } from "../dogs/NewDogForm"
import { EventList } from "../events/EventsList"
import { EditUserProfile } from "../users/EditUserProfile"
import { UserProfile } from "../users/UserProfile"
import { LandingPage } from "./LandingPage"

//This is a Controller Component. Its only responsibility is to determine which view of the application should be rendered 

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/home">
                <LandingPage />
            </Route>

            <Route path="/user-profile/:userId(\d+)">
                <UserProfile />
            </Route>

            <Route path="/edit-user-profile/:userId(\d+)">
                <EditUserProfile />
            </Route>

            <Route exact path="/all-dogs">
                <DogList />
            </Route>

            <Route path="/add-dog">
                <AddDog />
            </Route>

            <Route path="/dog-profile/:dogId(\d+)">
                <DogProfile />
            </Route>

            <Route path="/edit-dog-profile/:dogId(\d+)">
                <EditDogProfile />
            </Route>

            <Route exact path="/events">
                <EventList />
            </Route>

            <Route exact path="/blog-posts">
                <BlogPostList />
            </Route>

            <Route exact path="/add-blog-posts">
                <AddBlogPost />
            </Route>

            <Route exact path="/edit-blog-posts/:blogPostId(\d+)">
                <EditBlogPost />
            </Route>
        </>
    )
}