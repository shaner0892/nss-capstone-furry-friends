import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
// import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from "reactstrap";
import { Nav, NavItem, NavLink } from 'reactstrap';

// This is a Presentation Component. Directly expresses HTML.
// NavBar includes: my dogs, all dogs, and logout (stretch goal: events and blog posts)

export const NavBar = (props) => {
    // const [collapsed, setCollapsed] = useState(true);

    // const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <>
            <div class="header">
                <img className="logo" src="https://res.cloudinary.com/dfxsl6a2c/image/upload/v1647634780/Yellow_Brown_Petshop_Point_Logo_l7v1l2.png" alt="logo" />
                <h1 class="title">Nashville Furry Friends </h1>
            </div>
            <h5>Helping foster dogs find their furever homes since 2022</h5>
            <div class="navBar">
                <Nav pills>
                    <NavItem class="navBar_item">
                        <NavLink href="/home">Home</NavLink>
                    </NavItem>
                    <NavItem class="navBar_item">
                        <NavLink href="/all-dogs">All Dogs</NavLink>
                    </NavItem>
                    <NavItem class="navBar_item">
                        <NavLink href={`/user-profile/${parseInt(localStorage.getItem("furry_user"))}`}>My Profile</NavLink>
                    </NavItem>
                    <NavItem class="navBar_item">
                        <NavLink href="/events">Events</NavLink>
                    </NavItem>
                    <NavItem class="navBar_item">
                        <NavLink href="/blog-posts">Dog Blogs</NavLink>
                    </NavItem>
                    <NavItem class="navBar_item">
                        <NavLink href="/login" onClick={() => { localStorage.removeItem("furry_user") }}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </div>

        </>
    )
}
