import React, { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"

//this is the registration form for new users

export const EditUserProfile = (props) => {
    const [user, setUser] = useState({})
    const conflictDialog = useRef()
    const history = useHistory()
    
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users/${parseInt(localStorage.getItem("furry_user"))}`)
            .then(res => res.json())
            .then(user => setUser(user))
    }
    
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
            .then(() => history.push(`/user-profile/${user.id}`))
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={editUser}>
                <h2 className="h3 mb-3 font-weight-normal">Edit Profile</h2>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input value={user.firstName} onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input value={user.lastName} onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input value={user.email} onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> Bio </label>
                    <input value={user.bio} onChange={updateUser} type="text" id="bio" className="form-control" placeholder="Tell us about yourself" />
                </fieldset>
                <fieldset>
                    <button type="submit"> Save </button>
                </fieldset>
            </form>
        </main>
    )
}
