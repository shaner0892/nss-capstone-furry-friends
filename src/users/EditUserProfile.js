import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"

//this is the edit user profile page

export const EditUserProfile = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
    const history = useHistory()
    
    //this function fetches the current user from local storage and invokes the setUser function to assign them to user
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}`)
            .then(res => res.json())
            .then(user => setUser(user))
    }
    //use PUT method to update/edit the existing object
    useEffect(existingUserCheck, [])
    const editUser = (evt) => {
        evt.preventDefault()
        fetch(`http://localhost:8088/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            //.push routes you to a new page
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
                    <input value={user.firstName} onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input value={user.lastName} onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address: </label>
                    <input value={user.email} onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> About me: </label>
                    <input value={user.bio} onChange={updateUser} type="text" id="bio" className="form-control" placeholder="Tell us about yourself" />
                </fieldset>
                <fieldset>
                    <Button color ="success" outline type="submit"> Save </Button>
                </fieldset>
            </form>
        </main>
    )
}
