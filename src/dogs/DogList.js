import React, { useEffect, useState } from "react";
import { getAllDogs } from "../ApiManager";
import { Link } from "react-router-dom"

//this module is responsible for displaying all of the dogs

export const DogList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])

    //get all the dog info from the Api and update when it changes
    useEffect(
        () => {
            getAllDogs()
                .then((dogArray) => {
                    modifyDogs(dogArray)
                })
        },
        []
    )
    
    return (
        <>
            {/* //iterate dogs and convert them from objects to html using jsx
            //use map array method conversion tool 
            //need to display an abbreviated bio (name, age, adoptable) 
            //also need to display their picture 
            //use dynamic routing to create a link on each dog's name to access their individual profile*/}
            
            {
                dogs.map(
                    (dog) => {
                        return <p key={`dog--${dog.id}`}> <Link to={`/all-dogs/${dog.id}`}>{dog.name} </Link> <br></br>{dog.age} years old <br></br>{dog.adoptable? "Available for adoption!" : "Already adopted"}</p>
                    }
                )
            }
        </>
    )
}