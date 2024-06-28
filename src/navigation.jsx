import React from "react";
import "./styles/nav.css";
import {Link} from "react-router-dom";

const Navigation = () => {
    return(
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><Link to="/">Home</Link></li>
                <li className="nav-item"><Link to="/servicedropdown">Adding Service</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;