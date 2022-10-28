import React from "react";
import { Link } from "react-router-dom";
import hotelLogo from "../Images/hotelLogo.png"
const Nav = () => {
    return(
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
{/*            <div className="container-fluid footer-home">
                <Link to="/" className="navbar-brand" > 
                    <img className="img-responsive image-resize" src={hotelLogo} alt=""/>
                </Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link active" aria-current="page"  >Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registerpage" className="nav-link active" aria-current="page"  >Register</Link>
                    </li>
                    </ul>
                </div>
    </div>*/}
        </nav>
        

    )
}
export default Nav;