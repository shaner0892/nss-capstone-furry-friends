import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap"
import { getUserEmailReg, postRegistration } from "../../ApiManager"
import "./Login.css"


export const Register = (props) => {
    const [user, setUser] = useState({
        foster: false,
        bio: "",
        imageURL: "https://thumbs.dreamstime.com/b/female-dog-walker-sitter-walking-group-pets-silhouette-vector-female-dog-walker-sitter-walking-group-pets-124154396.jpg"
    })
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return getUserEmailReg(user)
            .then(user => !!user.length)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    postRegistration(user)
                        //this creates a new user and stores it in localStorage
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("furry_user", createdUser.id)
                                history.push("/all-dogs")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
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
            <div class="header">
                <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647634780/Yellow_Brown_Petshop_Point_Logo_l7v1l2.png" alt="logo" />
                <h1 className="title">Nashville Furry Friends </h1>
            </div>
            <h5>Helping foster dogs find their furever homes since 2022</h5>
            <form className="form--login" onSubmit={handleRegister}>
                <h3 className="h3 mb-3 font-weight-normal">Please Register for Nashville Furry Friends</h3>
                <fieldset>
                    <label htmlFor="firstName"> First Name: </label>
                    <input onChange={updateUser}
                        type="text" id="firstName" className="form-control"
                        placeholder="Enter your first name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name: </label>
                    <input onChange={updateUser}
                        type="text" id="lastName" className="form-control"
                        placeholder="Enter your last name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address: </label>
                    <input onChange={updateUser} type="email" id="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="foster">Do you currently foster dogs? </label>
                    <input type="checkbox" id="foster"
                        className="box"
                        onChange={(evt) => {
                            const copy = {...user}
                            copy.foster = evt.target.checked
                            setUser(copy)
                        }}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="bio"> About me: </label>
                    <input onChange={updateUser} type="text" id="bio" className="form-control" placeholder="Tell us about yourself" />
                </fieldset>
                <fieldset>
                    <Button id="btn" color="success" outline type="submit"> Register </Button>
                </fieldset>
            </form>
        </main>
    )
}
