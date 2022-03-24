import React, { useState, useEffect } from "react"
import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getAllAgeRanges, getAllRescues, getAllSizes, getCurrentDog, putEditDog } from "../ApiManager";
import UploadImages from "../UploadImage";
import { Button } from "reactstrap";

export const EditDogProfile = () => {
    //use the useState hook function to set the initial value of the new object
    const [rescues, modifyRescues] = useState([])
    const [sizes, modifySizes] = useState([])
    const [ages, modifyAgeRange] = useState([])
    const history = useHistory()
    const [dog, updateDog] = useState({});
    const {dogId} = useParams()

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
    //useEffect to get the current dog selected to edit
    useEffect(
        () => {
            getCurrentDog(parseInt(dogId))
                .then((dog) => {
                    updateDog(dog)
                })
        },
        []
    )

    const editDog = (evt) => {
        //capture the evt (event) and prevent the default (form submitted and reset) from happening
        evt.preventDefault()
        //object that we want to send to our API
        const editedDog = {
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

        putEditDog(dog, editedDog)
            .then(() => history.push(`/dog-profile/${dog.id}`))
    }
    //this will be the form you display, you need to capture user input and update the dog object
        //add values to each input to display previous user edits
    return (
        <form className="dogForm">
            <h2 className="dogForm__title">Edit {dog.name}'s Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input value={dog.name}
                        required autoFocus
                        type="text"
                        className="form-control"
                        //this onChange function is an event listener that uses the setter function from above to update the dog object
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
                        <input type="radio" name="sex" value="Male" class="radio" checked={dog.sex==="Male"? "checked" : ""} onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.sex = evt.target.value
                                updateDog(copy)
                            }
                        }/>Male
                        <input type="radio" name="sex" value="Female" class="radio" checked={dog.sex==="Female"? "checked" : ""} onChange={
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
                    <select name="age" className="form-control" value={dog.ageId}                        onChange={
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
                    <select name="size" className="form-control" value={dog.sizeId}  
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
                    <input type="checkbox" checked={dog.adoptable ? "checked" : ""}
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
                    <select name="rescue" className="form-control" value={dog.rescueId}
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
                    <input checked={dog.goodWKids? "checked" : ""}
                        type="checkbox"
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
                    <input checked={dog.goodWDogs? "checked" : ""}
                        type="checkbox"
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
                    <input checked={dog.goodWCats? "checked" : ""}
                        type="checkbox"
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
                    <textarea id="form-bio" cols="40" rows="5" value={dog.bio}
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (evt) => {
                                const copy = {...dog}
                                copy.bio = evt.target.value
                                updateDog(copy)
                            }
                        } ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <UploadImages obj={dog} update={updateDog} />
                </div>
            </fieldset>
            <div>
                <Button id="btn" color="success" outline className="btn btn-editDog" onClick={editDog} >
                    Save
                </Button>
            </div>
        </form>
    )
}
