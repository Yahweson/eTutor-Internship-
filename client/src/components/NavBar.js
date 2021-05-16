import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li>
                            <Link to="/login/" className="nav-link">Login</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }

}

export default NavBar;
