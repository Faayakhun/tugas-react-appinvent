import React from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Navbar } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './navbar.css'

export default function Navigation({isLogin, setIsLogin}) {
    let localUser = localStorage.getItem("user")
    let localUserObj = JSON.parse(localUser)
    const history = useHistory()
    const toRegister = () => history.push('/register')
      const handleLogout = () => {
        setIsLogin(false)
        localStorage.clear()
        toRegister()
      }
    return (
        <Navbar bg="dark" expand="lg" >
          <a className="navbar-brand">Navbar</a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <div className="navbar-nav">
                <li className="nav-link">
                    <Link to = "/">Home</Link>
                </li>
                <li className="nav-link" >
                    <Link to = "/inventory">inventory</Link>
                </li>
                <div className="navRight">
                <li id="loginNav" className="btn btn-light" >
                    {isLogin ? <Button variant="danger" onClick={handleLogout}>Logout</Button> : <Link to = "/login">Login</Link>  }
                </li>
                <li id="regisNav" className="btn btn-dark" >
                {isLogin ? <span>{localUserObj.name}</span> : <Link to = "/register">Register</Link>  }
                </li>
                </div>
          </div>
          </Navbar.Collapse>
          </Navbar>
    )
}