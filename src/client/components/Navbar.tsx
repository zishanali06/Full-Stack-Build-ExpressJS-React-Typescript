import * as React from 'react';
import {NavLink} from 'react-router-dom';

export interface NavbarProps {
    
}

const Navbar: React.SFC<NavbarProps> = () => {
    return ( 
        <nav className="navbar navbar-light bg-primary">
                <NavLink to="/" className="navbar-brand mb-0 h1">Book Store</NavLink>
                <NavLink to="/new" className="navbar-brand mb-0 h1">Add New Book</NavLink>
        </nav>
    );
}

export default Navbar;