import React, { useEffect, useState } from "react";
import { getAllDogs } from "../ApiManager";
import { useHistory } from "react-router";
import { AdoptableDogs } from "./AdoptableDogs";
import { AllDogs } from "./AllDogs";
import "./ToggleBar.css"

//this module is responsible for displaying all of the dogs

export const DogList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])
    const history = useHistory()
    const [toggle, setToggle] = useState(false)

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

    const changeView = (e) => {
        if (e.target.checked) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }
    return (
        <>
            {/* //iterate dogs using map array method and convert them from objects to html using jsx
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture 
            //use dynamic routing to create a link on each dog's name to access their individual profile*/}

            <h2>Furry Friends</h2>
            <p id="toggleText">Only show dogs available for adoption:</p>
            <label class="switch">
                <input type="checkbox"
                    onClick={changeView} />
                <span class="slider round"></span>
            </label>
            {
                toggle ? <AdoptableDogs/> : <AllDogs/>
            }
        </>
    )
}
