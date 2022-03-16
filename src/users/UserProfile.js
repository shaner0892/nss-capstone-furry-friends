import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { deleteDog, getUserDogs } from "../ApiManager";

//this module is responsible for displaying the user's info and their dogs

export const UserProfile = () => {
    //use useState to define and update user
    const [user, modifyUser] = useState({dogs:[]})
    //use useParams to implement a single resource view
    const { userId } = useParams()
    const history = useHistory()
    
    //use useEffect to monitor for updates to user
    //fetch by id (/user/id)
    //use _embed query string parameter to add dogs to user object
    useEffect(
        () => {
            getUserDogs()
                .then((userObj) => {
                    modifyUser(userObj)
                })
        },
        [userId]
    )

    //define a function to delete a dog from the user's profile
    //invoke the DELETE method from ApiManager and then fetch the user's new list of dogs
    const removeDog = (id) => {
        deleteDog(id)
            .then(()=> {
                getUserDogs()
                    .then((userObj) => {
                        modifyUser(userObj)
                    })
            })
    }

    return (
        <>
            {/* //display user's name and bio, add an edit button */}
            <h2>{user.firstName}'s Page</h2>
            <div>Name: {user.firstName} {user.lastName}</div>
            <div>Email: {user.email}</div>
            <div>About me: {user.bio}</div>
            <br></br>
            <button onClick={() => history.push(`/edit-user-profile/${parseInt(localStorage.getItem("furry_user"))}`)}> Edit My Profile </button>

            <h3>My Dogs</h3>
            {/* use map array method to display each dog for the user 
            make the name clickable and show the individual profile
            add an edit and delete button*/}
            {
                user.dogs.map(
                    (dog) => {
                        return <div key={`dog--${dog.id}`}>  <img src={dog.imageURL}/>
                            <Link to={`/dog-profile/${dog.id}`}>
                                <p>{dog.name}</p>
                            </Link>
                            <button onClick={() => history.push(`/edit-dog-profile/${dog.id}`)}> Edit Dog Profile </button>
                            <button onClick={() => {removeDog(dog.id)}}> Delete Dog Profile </button>
                        </div>
                    }
                )
            }
            <br></br>
            {/* //display add new dog button, <Link> to take to NewDogForm*/}
            <div>
                <Link to="/add-dog">
                    <button > Add New Dog </button>
                </Link>
            </div> 
        </>
    )
}