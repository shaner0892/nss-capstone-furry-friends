import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import { getUserEmail } from "../../ApiManager";
import "./Login.css"


export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()
    const existingUserCheck = () => {
        return getUserEmail(email)
        .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("furry_user", exists.id)
                    history.push("/home")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <div className="header">
                <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647634780/Yellow_Brown_Petshop_Point_Logo_l7v1l2.png" alt="logo" />
                <h1 className="title">Nashville Furry Friends </h1>
            </div>
            <div>

            <h5>Helping foster dogs find their furever homes since 2022</h5>
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h3>Please sign in</h3>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" 
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <Button id="btn" color="success" outline type="submit">
                            Sign in
                        </Button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
            </div>
        </main>
    )
}