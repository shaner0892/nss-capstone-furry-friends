import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

// This is a Presentation Component. Directly expresses HTML.
// NavBar includes: my dogs, all dogs, and logout (stretch goal: events and blog posts)

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/all-dogs">All Dogs</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to={`/user-profile/${parseInt(localStorage.getItem("furry-user"))}`}> My Profile </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("furry_user")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}