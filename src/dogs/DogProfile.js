import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

// this module is responsible for displaying the selected dog's individual profile

export const DogProfile = () => {
    // useState to store and modify dog array
    const [dog, modifyDog] = useState({})
    const { dogId } = useParams()

    //fetch the information for the dog that was clicked on
    useEffect(
        () => {
            return fetch(`http://localhost:8088/dogs/${dogId}?_expand=user&_expand=rescue&_expand=size&_expand=age`)
                .then(res => res.json()) 
                .then((dogObj) => {
                    modifyDog(dogObj)
                })
        },
        [dogId]
    )

    return (
        // need to display all info: name, age, gender, adoptable, rescue, good with kids/dogs/cats, size, and bio
        // need to display picture(s)
        // need to display how to contact about dog (display rescue/email and user/email)
        // use a ternary statement to display contact info IF they are adoptable
        <>
        <h2>All about {dog.name}!</h2>
        <section>
            <img src={dog.imageURL}/>
            <div> Name: {dog.name} </div>
            <div> Gender: {dog.sex} </div>
            <div> Age Range: {dog.age?.range} </div>
            <div> Size: {dog.size?.type} </div>
            <div> Adoptable: {dog.adoptable? "Yes" : "No"} </div>
            <div> Rescue: {dog.rescue?.name} </div>
            <div> Good with kids? {dog.goodWKids? "Yes" : "No"} </div>
            <div> Good with dogs? {dog.goodWDogs? "Yes" : "No"} </div>
            <div> Good with cats? {dog.goodWCats? "Yes" : "No"} </div>
            <div> Bio: {dog.bio} </div>
        </section>
        <section>
            <div>{dog.adoptable? `To learn more about me you can contact ${dog.rescue?.name} at ${dog.rescue?.email} or my foster, ${dog.user?.firstName} at ${dog.user?.email}` : ""} </div>
        </section>

        </>
    )

}