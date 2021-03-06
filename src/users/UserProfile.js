import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { deleteDog, getUserDogs } from "../ApiManager";


export const UserProfile = () => {
    const [user, modifyUser] = useState({dogs:[]})
    const { userId } = useParams()
    const history = useHistory()
    
    //use _embed query string parameter to add dogs to user object
    useEffect(
        () => {
            getUserDogs()
                .then(modifyUser)
        },
        [userId]
    )

    //invoke the DELETE method from ApiManager and then fetch the user's new list of dogs
    const removeDog = (id) => {
        deleteDog(id)
            .then(()=> {
                getUserDogs()
                    .then(modifyUser)
            })
    }

    return (
        <>
            {/* display user's name and bio, add an edit button */}
            {/* display add new dog button that pushes to NewDogForm*/}
            <h2>{user.firstName}'s Page</h2>
            <section className="userProfile">
                <img className="userPic" src={user.imageURL}/>
                <div><b>Name:</b> {user.firstName} {user.lastName}</div>
                <div><b>Email:</b> {user.email}</div>
                <div><b>Current foster:</b> {user.foster? "Yes" : "No"}</div>
                <div><b>About me:</b> {user.bio}</div>
                <br></br>
                <Button id="btn" color="success" outline onClick={() => history.push(`/edit-user-profile/${parseInt(localStorage.getItem("furry_user"))}`)}> Edit My Profile </Button><br></br>
            </section>

            <h3>My Dogs</h3>
                <Button id="rightBtn" color="success" outline onClick={() => history.push("/add-dog")}> Add New Dog </Button>
            {/* use map array method to display each dog for the user 
            make the name clickable and show the individual profile
            add an edit and delete button*/}
            <section className="dogList">
                {
                    user.dogs.map(
                        (dog) => {
                            return <section className="dog" key={`dog--${dog.id}`}>
                                        <img className="zoom" src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)}/>
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