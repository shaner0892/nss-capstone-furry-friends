import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink } from "reactstrap";

// This is a Presentation Component. Directly expresses HTML.
// NavBar includes: my dogs, all dogs, and logout (stretch goal: events and blog posts)



export const NavBar = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <div>
           <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto" href="/all-dogs">Furry Friends</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/all-dogs">All Dogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href={`/user-profile/${parseInt(localStorage.getItem("furry_user"))}`}>
                                My Profile
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/events">Events</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/blog-posts">Dog Blogs</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#" onClick={() => {
                                    localStorage.removeItem("furry_user");
                                }}
                            >
                                Logout
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

        // <ul className="navbar">
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/all-dogs">All Dogs</Link>
        //     </li>
        //     <li className="navbar__item">
        //         <Link className="navbar__link" to={`/user-profile/${parseInt(localStorage.getItem("furry_user"))}`}> My Profile </Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/events">Events</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/blog-posts">Dog Blogs</Link>
        //     </li>
        //     <li className="navbar__item">
        //         <Link className="navbar__link" to="#"
        //             onClick={
        //                 () => {
        //                     localStorage.removeItem("furry_user")
        //                 }
        //             }>
        //             Logout
        //         </Link>
        //     </li>
        // </ul>
    );
};
