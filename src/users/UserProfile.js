import React, { useEffect, useState } from "react";
import { getAllUsers } from "../ApiManager";

//this module is responsible for displaying the user's info and their dogs

export const UserProfile = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [users, modifyUsers] = useState([])

    //useEffect is a hook, it takes two arguments(function and array)
    //sole purpose is to run code when state changes(it's like an event listener)
    useEffect(
        () => {
            getAllUsers()
                .then((userArray) => {
                    modifyUsers(userArray)
                })
        },
        []
    )

    //use find array method because you need to find the single matching user
    //how do I access current user's id? ******************
    const foundUser = users.find((user) => {

    })
    //iterate dogs and find all dogs that match user.id and dog.userId
    //use filter array method because you may return multiple objects
    
    return (
        <>
            {/* //display add new dog button
            //display foundUser's name and bio 
            //add an edit button*/}
            
            
            
            {/* {
                users.map(
                    (user) => {
                        return <p key={`user--${user.id}`}>{user.firstName} {user.lastName} </p>
                    }
                )
            } */}
             {/* //display dog's name with an edit and a delete button*/}
            <fieldset>
                <button type="submit"> Edit </button>
            </fieldset><fieldset>
                <button type="submit"> Delete Profile </button>
            </fieldset>
            
        </>
    )
}