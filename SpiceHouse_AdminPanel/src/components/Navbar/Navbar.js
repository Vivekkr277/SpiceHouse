import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <div className="navbar">
          <div className="nav-left">
            <p>Pahadi Baba</p>
          </div>
          <div className="nav-right">
           <Link to="/orders" style={{textDecoration : 'none'}}>
             <p>orders</p>
           </Link>
           <Link to="/addfood" style={{textDecoration: 'none'}}>
            <p>addfood</p>
           </Link>
          </div>
           
        </div>
    )
}

export default Navbar;