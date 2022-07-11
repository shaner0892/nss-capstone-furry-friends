import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCurrentDog } from "../ApiManager";


export const DogProfile = () => {
    // useState to store and modify dog array
    const [dog, modifyDog] = useState({})
    const { dogId } = useParams()

    useEffect(
        () => {
            getCurrentDog(dogId)
                .then(modifyDog)
        },
        [dogId]
    )

    return (
        // need to display all info: name, age, gender, adoptable, rescue, good with kids/dogs/cats, size, bio, and picture
        // use a ternary statement to display contact info IF they are adoptable
        <>
        <h2>All about {dog.name}!</h2>
            <img className="dogProfilePic" src={dog.imageURL}/>
        <section className="dogProfile">
            <div> <b>Name:</b> {dog.name} </div>
            <div> <b>Sex:</b> {dog.sex} </div>
            <div> <b>Age Range:</b> {dog.age?.range} </div>
            <div> <b>Size:</b> {dog.size?.type} </div>
            <div> <b>Adoptable:</b> {dog.adoptable? "Yes" : "No"} </div>
            <div> <b>Rescue:</b> {dog.rescue?.name} </div>
            <div> <b>Good with kids?</b> {dog.goodWKids? "Yes" : "No"} </div>
            <div> <b>Good with dogs?</b> {dog.goodWDogs? "Yes" : "No"} </div>
            <div> <b>Good with cats?</b> {dog.goodWCats? "Yes" : "No"} </div>
            <div> <b>Bio:</b> {dog.bio} </div>
            <br></br>
            <div>{dog.adoptable? `To learn more about adopting me please contact ${dog.rescue?.name}` : ""} </div>
        </section>

        </>
    )

}