import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { getCurrentUser, putEditUser } from "../ApiManager"
import UploadImages from "../UploadImage"


export const EditUserProfile = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
    const history = useHistory()
    
    //this function fetches the current user from local storage and invokes the setUser function to assign them to user
    const existingUserCheck = () => {
        getCurrentUser()
            .then(setUser)
    }
    //use PUT method to update/edit the existing object
    useEffect(existingUserCheck, [])
    const editUser = (evt) => {
        evt.preventDefault()
        putEditUser(user)
            .then(() => history.push(`/user-profile/${user.id}`))
    }

    //this function makes a copy of the user object and then each time the user makes a selection/input it passes it through the setUser function to update the user object
    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    //this will be the form you display, you need to capture user input and update the user object
        //add values to each input to display previous user edits
    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={editUser}>
                <h2 className="h3 mb-3 font-weight-normal">Edit Your Profile</h2>
                <fieldset>
                    <label htmlFor="firstName"> First Name: </label>
                    <input id="firstName" value={user.firstName} onChange={updateUser} type="text" className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input id="lastName" value={user.lastName} onChange={updateUser} type="text" className="form-control" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address: </label>
                    <input id="email" value={user.email} onChange={updateUser} type="email" className="form-control" required />
                </fieldset>
                <fieldset>
                    {/* a value is being passed into updateUser whereas this one is checked or not, write a separate function in the onChange */}
                    <label htmlFor="foster">Do you currently foster dogs? </label>
                    <input id="foster" checked={user.foster ? "checked" : ""} type="checkbox" className="box" onChange={
                            (evt) => {
                                const copy = {...user}
                                copy.foster = evt.target.checked
                                setUser(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> About me: </label>
                    <textarea id="bio" value={user.bio} cols="40" rows="5" onChange={updateUser} type="text" className="form-control" ></textarea>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <img className="userPic" src={user.imageURL}/><br></br>
                    <UploadImages obj={user} update={setUser} />
                </div>
                </fieldset>
                <fieldset>
                    <Button id="btn" color="success" outline type="submit"> Save </Button>
                </fieldset>
            </form>
        </main>
    )
}
