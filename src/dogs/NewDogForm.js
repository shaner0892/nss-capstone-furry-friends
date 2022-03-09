import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRescues } from "../ApiManager";

export const AddDog = () => {
    //use the useState hook function to set the initial value of the new object
    const [rescues, modifyRescues] = useState([])
    
    //add useEffect
    //this is watching for updates to the locations array and fetches them from the API, it updates locations to = the locations array from the API
    useEffect(
        () => {
            getAllRescues()
                .then((rescuesArray) => {
                    modifyRescues(rescuesArray)
                })
        },
        []
    )
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [dog, updateDog] = useState({
        name: "",
        age: 0,
        gender: "",
        bio: "",
        adoptable: false,
        rescueId: 0,
        userId: 0,
        goodWKids: false,
        goodWDogs: false,
        goodWCats: false,
        sizeId: 0
    });
    //need clarification on this ***************
    const history = useHistory()

    const apply = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newDog = {
            name: dog.name,
            age: dog.age,
            gender: dog.gender,
            bio: dog.bio,
            adoptable: dog.adoptable,
            rescueId: dog.rescueId,
            userId: dog.userId,
            goodWKids: dog.goodWKids,
            goodWDogs: dog.goodWDogs,
            goodWCats: dog.goodWCats,
            sizeId: dog.sizeId
        }

        //POST the newDog object from above to the API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //you cannot send JavaScript objects across HTTP so you have to send it in strings/stringify
            body: JSON.stringify(newDog)
        }

        //fetch the new list of dogs from the API
        return fetch("http://localhost:8088/dogs?_expand=user&_expand=rescue", fetchOption)
            .then(() => {
                history.push("/dogs")
            })
    }
    //this will be the form you display, you need to capture user input and save to new object
    return (
        <form className="dogForm">
            <h2 className="dogForm__title">New Dog Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Dog's name"
                        //this onChange function is an event listener that uses the setter function from above 
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.name = evt.target.value
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gender">Gender </label>
                        <input type="radio" name="gender" value="Male" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.gender = evt.target.value
                                updateDog(copy)
                            }
                        }/>Male
                        <input type="radio" name="manager" value="Female" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.gender = evt.target.value
                                updateDog(copy)
                            }
                        }/>Female
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <select name="age" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.age = parseInt(evt.target.value)
                                updateDog(copy)
                            }
                        }
                    >
                        <option value="0">Select Age (by years)</option>
                            {/* {rescues.map((rescue) => {
                                return <option value={}>{}</option>
                            })} */}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="adoptable">Adoptable? </label>
                    <input type="checkbox"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.adoptable = evt.target.checked
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Rescue: </label>
                    <select name="rescue" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.rescueId = parseInt(evt.target.value)
                                updateDog(copy)
                            }
                        }
                    >
                        <option value="0">Select the rescue organization</option>
                            {rescues.map((rescue) => {
                                return <option value={rescue.id}>{rescue.name}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="goodWKids">Good with kids? </label>
                    <input type="checkbox"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.goodWKids = evt.target.checked
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="goodWDogs">Good with dogs? </label>
                    <input type="checkbox"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.goodWDogs = evt.target.checked
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="goodWCats">Good with cats? </label>
                    <input type="checkbox"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.goodWCats = evt.target.checked
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Bio: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Tell us about your pup!"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.bio = evt.target.value
                                updateDog(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-picture" onClick={}>
                Upload a picture
            </button>
            <button className="btn btn-addDog" onClick={}>
                Submit
            </button>
        </form>
    )
}
