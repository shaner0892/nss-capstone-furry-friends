import React, { useEffect, useState } from "react";
import { getAllDogs } from "../ApiManager";

// this module is responsible for displaying the selected dog's individual profile

export const DogProfile = () => {
    // useState to store and modify dog array
    const [dogs, modifyDogs] = useState([])

    useEffect(
        () => {
            getAllDogs()
                .then((dogArray) => {
                    modifyDogs(dogArray)
                })
        },
        []
    )

    // iterate through the dogs array and use find array method to find the matching dog 
    return (
        // need to display all info: name, age, gender, adoptable, rescue, good with kids/dogs/cats, size, and bio
        // need to display picture(s)
        // need to display how to contact about dog (display rescue/email and user/email)
        <>
        
        </>
    )

}