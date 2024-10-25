import React from 'react'
import "./Navbar.css"
import navlogo from "../../Assets/logo.png"
import { IoPersonCircleSharp } from "react-icons/io5"

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="logo-img-container">
                <img className='logo-img' src={navlogo} alt="" />
                <h1>ADMIN PANEL</h1>
            </div>
            <IoPersonCircleSharp className='avatar' />
        </div>
    )
}

export default Navbar
