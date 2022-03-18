import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllAgeRanges, getAllRescues, getAllSizes } from "../ApiManager";
import UploadImages from "../UploadImage";
import { Button } from "reactstrap";

export const AddDog = () => {
    //use the useState hook function to set the initial value of the new object
    const [rescues, modifyRescues] = useState([])
    const [sizes, modifySizes] = useState([])
    const [ages, modifyAgeRange] = useState([])
    const [user, setUser] = useState({})    

    //this function fetches the current user from local storage and invokes the setUser function to update the user object
    const currentUser = () => {
        return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}`)
            .then(res => res.json())
            .then(user => setUser(user))
    }

    useEffect(
        () => {
            currentUser()
        },
        []
    )

    //add useEffect
    //this is watching for updates to the rescues and sizes array and fetches them from the API, it updates locations to = the locations array from the API
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
    //useState hook function sets the initial value of dog to the defined properties, updateDog is a function you invoke later on to modify the values
    const [dog, updateDog] = useState({
        name: "",
        ageId: 0,
        sex: "",
        bio: "",
        adoptable: false,
        rescueId: 0,
        userId: 0,
        goodWKids: false,
        goodWDogs: false,
        goodWCats: false,
        sizeId: 0,
        imageURL: ""
    });
    //need clarification on this ***************
    const history = useHistory()

    const addNewDog = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const newDog = {
            name: dog.name,
            ageId: dog.ageId,
            sex: dog.sex,
            bio: dog.bio,
            adoptable: dog.adoptable,
            rescueId: dog.rescueId,
            userId: parseInt(localStorage.getItem("furry_user")),
            goodWKids: dog.goodWKids,
            goodWDogs: dog.goodWDogs,
            goodWCats: dog.goodWCats,
            sizeId: dog.sizeId,
            imageURL: dog.imageURL
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

        //fetch the new list of dogs from the API and take the user to their profile page
        return fetch("http://localhost:8088/dogs?_expand=user&_expand=rescue&_expand=size", fetchOption)
            .then(() => history.push(`/user-profile/${user.id}`))
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
                    <label htmlFor="sex">Sex: </label>
                        <input class="radio" type="radio" name="sex" value="Male" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sex = evt.target.value
                                updateDog(copy)
                            }
                        }/>Male
                        <input class="radio" type="radio" name="sex" value="Female" onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sex = evt.target.value
                                updateDog(copy)
                            }
                        }/>Female
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age">Age Range: </label>
                    <select name="age" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.ageId = parseInt(evt.target.value)
                                updateDog(copy)
                            }
                        }
                    >
                        <option value="0">Select Age Range</option>
                            {ages.map((age) => {
                                return <option value={age.id}>{age.range}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Size: </label>
                    <select name="size" className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sizeId = parseInt(evt.target.value)
                                updateDog(copy)
                            }
                        }
                    >
                        <option value="0">Select Size</option>
                            {sizes.map((size) => {
                                return <option value={size.id}>{size.type}</option>
                            })}
                    </select> 
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="adoptable">Adoptable? </label>
                    <input type="checkbox"
                        className="box"
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
                        className="box"
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
                        className="box"
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
                        className="box"
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
                    <label htmlFor="bio">Bio: </label>
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
            <fieldset>
                <div className="form-group">
                    <UploadImages obj={dog} update={updateDog} />
                </div>
            </fieldset>
            <div>
                <Button id="btn" color ="success" outline className="btn btn-addDog" onClick={addNewDog} >
                    Submit
                </Button>
            </div>
        </form>
    )
}
