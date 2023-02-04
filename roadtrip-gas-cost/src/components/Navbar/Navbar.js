import { Link } from 'react-router-dom';
import React from 'react';


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <Link className="navbar-brand" to="/"><a><i class="fa fa-solid fa-gas-pump"></i> <span>Roadtrip Gas Cost Calculator</span></a></Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        <li className="nav-item active">
            <Link className="nav-link" to="/"><a>Home</a> <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/state-prices"><a>State Gas Prices</a></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/last-trip"><a>Your Last Trip</a></Link>
        </li>
        </ul>
    </div>
    </nav>
  );
}

export default Navbar