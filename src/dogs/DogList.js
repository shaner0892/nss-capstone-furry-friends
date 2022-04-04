import React, { useEffect, useState } from "react";
import { getAllDogs, getAllRescues, getAllSizes, getAllAgeRanges } from "../ApiManager";
import { AllDogs } from "./AllDogs";
import "./ToggleBar.css"

//this module is responsible for displaying and filtering all of the dogs

export const DogList = () => {
    //useState is a hook, it takes a single argument and returns an array
    const [dogs, modifyDogs] = useState([])
    const [rescues, modifyRescues] = useState([])
    const [sizes, modifySizes] = useState([])
    const [ages, modifyAgeRange] = useState([])
    const [filterDogs, modifyFilterDogs] = useState([])
    const [filter, modifyFilter] = useState({})

    //get all the dog info from the Api and update when it changes
    //make a copy that you are able to change when filters apply
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

    //this function is reusable; it uses the selected filter[prop] to find matching dogs in the copy array
    const sort = (prop, copy) => {
        let dogFilter = copy.filter(dog => dog[prop] == filter[prop])
        return dogFilter
    }

    //checks if each filter was selected and passes that prop to the sort function to find matching dogs
    useEffect(
        () => {
            let copy = [...dogs]
            //add if statements for each filter and update copy
            if (filter.sex && filter.sex != "Both") {
                copy = sort("sex", copy)
            }
            if (filter.adoptable === true) {
                copy = sort("adoptable", copy)
            }
            if (filter.ageId && filter.ageId != "All") {
                copy = sort("ageId", copy)
            }
            if (filter.sizeId && filter.sizeId != "All") {
                copy = sort("sizeId", copy)
            }
            if (filter.rescueId && filter.rescueId != "All") {
                copy = sort("rescueId", copy)
            }
            modifyFilterDogs(copy)
        },
        [filter]
    )

    //each time a selection is made this function is invoked
    //if a filter has been selected it adds a property to the object with the value of the selection (ex: copy.ageId = 2)
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
            {/* Add filters for user to sort by adoptable, sex, age, size, and rescue org */}
            <h2>Furry Friends</h2>
            <form className="dogForm">
                <p><b>Filter Dogs</b></p>
                <p id="toggleText">Only show dogs available for adoption:</p>
                <label className="switch">
                    <input name="adoptable" type="checkbox" onClick={sortDogs} />
                    <span className="slider round"></span>
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
                            <select name="ageId" className="filter-control" onChange={sortDogs}>
                                <option value="All">Show All Ages</option>
                                {ages.map((age) => {
                                    return <option value={age.id}>{age.range}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="size">Size: </label>
                            <select name="sizeId" className="filter-control" onChange={sortDogs}>
                                <option value="All">Show All Sizes</option>
                                {sizes.map((size) => {
                                    return <option value={size.id}>{size.type}</option>
                                })}
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="filter-group">
                            <label htmlFor="rescue">Rescue: </label>
                            <select name="rescueId" className="filter-control" onChange={sortDogs}>
                                <option value="All">Show All Rescue Organizations</option>
                                {rescues.map((rescue) => {
                                    return <option value={rescue.id}>{rescue.name}</option>
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
