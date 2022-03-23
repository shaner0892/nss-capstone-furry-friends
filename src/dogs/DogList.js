import React, { useEffect, useState } from "react";
import { getAllDogs, getAllRescues, getAllSizes, getAllAgeRanges } from "../ApiManager";
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
    const [rescues, modifyRescues] = useState([])
    const [sizes, modifySizes] = useState([])
    const [ages, modifyAgeRange] = useState([])
    const [filterDogs, modifyFilterDogs] = useState([])
    const [filter, modifyFilter] = useState({})

    //get all the dog info from the Api and update when it changes
    useEffect(
        () => {
            getAllDogs()
                .then((dogArray) => {
                    modifyDogs(dogArray)
                    let copy = [...dogArray]
                    modifyFilterDogs(copy)
                })
        },
        []
    )
    useEffect(
        () => {
            getAllRescues()
                .then((rescuesArray) => {
                    modifyRescues(rescuesArray)
                })
        },
        []
    )
    useEffect(
        () => {
            getAllSizes()
                .then((sizesArray) => {
                    modifySizes(sizesArray)
                })
        },
        []
    )
    useEffect(
        () => {
            getAllAgeRanges()
                .then((agesArray) => {
                    modifyAgeRange(agesArray)
                })
        },
        []
    )

    const sort = (prop, copy) => {
        let dogFilter = copy.filter(dog => dog[prop] === filter[prop])
        return dogFilter
    }

    useEffect(
        () => {
            let copy = [...dogs]
            if (filter.sex && filter.sex != "Both") {
                copy = sort("sex", copy)
            }
            if (filter.adoptable === true) {
                copy = sort("adoptable", copy)
            }
            //add if statements
            // if (filter.age && filter.age != "All") {
            //     copy = sort("age", copy)
            // }

            modifyFilterDogs(copy)
        },
        [filter]
    )

    // const adoptableView = (e) => {
    //     if (e.target.checked) {
    //         setToggle(true)
    //     } else {
    //         setToggle(false)
    //     }
    // }



    const sortDogs = (e) => {
        let copy = { ...filter }
        if (e.target.checked) {
            copy[e.target.name] = e.target.checked
        } else {
            copy[e.target.name] = e.target.value
        }
        modifyFilter(copy)
    }

    return (
        <>
            {/* //iterate dogs using map array method and convert them from objects to html using jsx
            //need to display an abbreviated bio (name, age, adoptable) 
            //need to display their picture 
            //use dynamic routing to create a link on each dog's name to access their individual profile*/}
            {/* Add filters for user to sort by adoptable, sex, age, size, and rescue org */}
            <h2>Furry Friends</h2>

            <form className="dogForm">
                <p><b>Filter Dogs</b></p>
                <p id="toggleText">Only show dogs available for adoption:</p>
                <label class="switch">
                    <input name="adoptable" type="checkbox"
                        onClick={sortDogs} />
                    <span class="slider round"></span>
                </label>
                <section className="filter-section">
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="sex">Sex: </label>
                            <select name="sex" className="filter-control" onChange={sortDogs}>
                                <option value="Both">Show Male & Female</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="age">Age Range: </label>
                            <select name="age" className="filter-control" >
                                <option value="All">Show All Ages</option>
                                {ages.map((age) => {
                                    return <option value={age.range}>{age.range}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="size">Size: </label>
                            <select name="size" className="filter-control" >
                                <option value="All">Show All Sizes</option>
                                {sizes.map((size) => {
                                    return <option value={size.type}>{size.type}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="location">Rescue: </label>
                            <select name="rescue" className="filter-control" >
                                <option value="All">Show All Rescue Organizations</option>
                                {rescues.map((rescue) => {
                                    return <option value={rescue.name}>{rescue.name}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                </section>

            </form>
            {
                <AllDogs filterDogs={filterDogs} />
            }
        </>
    )
}
