import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//this module is responsible for displaying the user's info and their dogs

export const UserProfile = () => {
    //use useState to define and update user
    const [user, modifyUser] = useState({})
    //use useParams to implement a single resource view
    const { userId } = useParams()
    //use useEffect to monitor for updates to user
    //fetch by id (/user/id)
    //use _embed query string parameter to add dogs to user object
    useEffect(
        () => {
            return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
                .then(res => res.json())
                .then((userObj) => {
                    modifyUser(userObj)
                })
        },
        [userId]
    )
    //not working
    //write a function that iterates through the user and prints each dog with buttons
    // const eachDog = (user) => {
    //     for (dog of user) {
    //         return <section>
    //             <div>${user.dog?.name}</div>
    //             <div><button > Edit Dog Profile </button></div>
    //         </section>
    //     }
    // }
    //define a function to delete a dog from the user's profile
    //use DELETE method and then fetch the user's new list of dogs
    const removeDog = (id) => {
        fetch(`http://localhost:8088/dogs/${id}`, {
            method: "DELETE"
        })
        .then(()=> {
            return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}?_embed=dogs`)
                .then(res => res.json())
                .then((userObj) => {
                    modifyUser(userObj)
                })
        })
    }

    return (
        <>
            {/* //display user's name and bio 
            //add an edit button */}
            <h1>{user.firstName}'s Page</h1>
            <div>{user.bio}</div>
            <fieldset>
                <button > Edit My Profile </button>
            </fieldset>
            {/* //display add new dog button, <Link> to take to NewDogForm*/}
            <fieldset>
                <Link to="/add-dog">
                    <button > Add New Dog </button>
                </Link>
            </fieldset>
             {/* //display each dog's name with an edit and a delete button
             //how do I print each dog? iterate through the user with filter? ***********/}
            <h3>My Dogs</h3>
            {/* {eachDog(user)} */}
            {/* <div>{user.dog?.name}</div>*/}
            <fieldset>
                <button > Edit Dog Profile </button>
            </fieldset> 
            <fieldset>
                <button onClick={() => {
                    removeDog(user.dog?.id )
                }}> Delete Dog Profile </button>
            </fieldset>
            
        </>
    )
}