import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllUsers } from "../ApiManager";

//this module is responsible for displaying the user's info and their dogs

export const UserProfile = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [users, modifyUsers] = useState([])
    const {userId} = useParams()
    //useEffect is a hook, it takes two arguments(function and array)
    //sole purpose is to run code when state changes(it's like an event listener)
    //change getAllUsers to get by id (/user/id)
    // _embed to add dogs to user object
    // to={`/user-profile/${parseInt(localStorage.getItem("furry-user"))}`}> 
    useEffect(
        () => {
            getAllUsers()
                .then((userArray) => {
                    modifyUsers(userArray)
                })
        },
        []
    )





    return (
        <>
            {/* //display user's name and bio 
            //add an edit button */}
            
            <fieldset>
                <button type="submit"> Edit My Profile </button>
            </fieldset>
            {/* //display add new dog button, addDog function*/}
            <fieldset>
                <button type="submit"> Add New Dog </button>
            </fieldset>
            {/* {
                users.map(
                    (user) => {
                        return <p key={`user--${user.id}`}>{user.firstName} {user.lastName} </p>
                    }
                )
            } */}
             {/* //display dog's name with an edit and a delete button*/}
            
            <fieldset>
                <button type="submit"> Edit Dog Profile </button>
            </fieldset>
            <fieldset>
                <button type="submit"> Delete Dog Profile </button>
            </fieldset>
            
        </>
    )
}