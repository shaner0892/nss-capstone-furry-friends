import React, { useEffect, useState } from "react";
import { getAllDogs } from "../ApiManager";
import { useHistory } from "react-router";

//this module is responsible for displaying all of the dogs

export const AllDogs = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])
    const history = useHistory()

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
            {/* //iterate dogs using map array method and convert them from objects to html using jsx
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture 
            //use dynamic routing to create a link on each dog's name to access their individual profile*/}
            
            <section class="dogList">
            {
                dogs.map(
                    (dog) => {
                        return <section class="dog" key={`dog--${dog.id}`}> 
                            <img src={dog.imageURL} onClick={() => history.push(`/dog-profile/${dog.id}`)}/>
                            <div><b>{dog.name}</b> </div>
                            <div>{dog.age?.range} </div>
                            <div>{dog.sex}</div>
                            <div>{dog.adoptable? "Available for adoption!" : "Already adopted"}</div>
                            {/* <Button color ="success" outline >Learn more</Button> */}
                        </section>
                    }
                )
            }
            </section>
        </>
    )
}
