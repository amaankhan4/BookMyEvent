import React from "react";
import { Link } from 'react-router-dom';

const NavbarComp:React.FC = () => {

    return (
        <div className="navbar">
            <p className="logo">BookMyEvent</p>
            <ul>
                <li>
                    <Link to='/'><p>Home</p></Link>
                </li>
                <li>
                    <p>About</p>
                </li>
                <li>
                    <p>Contact</p>
                </li>
                <li>
                    <Link to='/events'><p>Events</p></Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to='/auth'><p>Login/Signup</p></Link>
                </li>
            </ul>
        </div>
    );
};

export default NavbarComp;
