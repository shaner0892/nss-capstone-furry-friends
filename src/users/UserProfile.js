import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { deleteDog, getUserDogs } from "../ApiManager";
import { Button } from "reactstrap";

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
            {/* //display add new dog button, <Link> to take to NewDogForm*/}
            <h2>{user.firstName}'s Page</h2>
            <section class="userProfile">
                <div><b>Name:</b> {user.firstName} {user.lastName}</div>
                <div><b>Email:</b> {user.email}</div>
                <div><b>About me:</b> {user.bio}</div>
                <br></br>
                <Button id="btn" color ="success" outline onClick={() => history.push(`/edit-user-profile/${parseInt(localStorage.getItem("furry_user"))}`)}> Edit My Profile </Button><br></br>
            </section>

            <h3>My Dogs</h3>
                <Button id="rightBtn" color ="success" outline onClick={() => history.push("/add-dog")}> Add New Dog </Button>
            {/* use map array method to display each dog for the user 
            make the name clickable and show the individual profile
            add an edit and delete button*/}
            <section class="dogList">
                {
                    user.dogs.map(
                        (dog) => {
                            return <section class="dog" key={`dog--${dog.id}`}>
                                        <img src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)}/>
                                        <p>{dog.name}</p>
                                        <Button id="btn" color ="success" outline onClick={() => history.push(`/edit-dog-profile/${dog.id}`)}> Edit Profile </Button><br></br>
                                        <Button id="btn" color ="success" outline onClick={() => {removeDog(dog.id)}}> Delete Profile </Button>
                                    </section>
                        }
                    )
                }
                <br></br>
            </section>
        </>
    )
}