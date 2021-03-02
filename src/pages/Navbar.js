import React from 'react'
import { Link } from "react-router-dom";
import './navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
                <a className="nav-link">
                    <Link to = "/">Home</Link>
                </a>
                <a className="nav-link" >
                    <Link to = "/inventory">inventory</Link>
                </a>
                <div className="navRight">
                <a id="loginNav" className="btn btn-light" >
                    <Link to = "/login">Login</Link>
                </a>
                <a id="regisNav" className="btn btn-dark" >
                    <Link to = "/register">Register</Link>
                </a>
                </div>
          </div>
          </div>
          </div>
          </nav>
    )
}