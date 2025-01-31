import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoClose } from "react-icons/io5"
import logo from "../Assets/logo.png"
import { GiShoppingCart } from 'react-icons/gi'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

	const [menu, setMenu] = useState("shop")
	const { getTotalCartItems } = useContext(ShopContext)

	const openMenuHandler = () => {
		const nav = document.getElementById('navbar')
		nav.classList.add("openNav")
	}

	const closeMenuHandler = () => {
		const nav = document.getElementById('navbar')
		nav.classList.remove("openNav")
	}

	const goHome = useNavigate()

	return (
		<div className='navbar'>
			<div className="nav-logo">
				<img onClick={() => goHome("/")} className='nav-logo-img' src={logo} alt="" />
				<p>GreefTechnologies</p>
			</div>
			<ul id='navbar' className="nav-manu">
				<li onClick={() => { setMenu("shop") }}><NavLink onClick={closeMenuHandler} to="/" replace={true}>Shop</NavLink></li>
				<li onClick={() => { setMenu("mens") }}><NavLink onClick={closeMenuHandler} to="/mens" replace={true}>Men</NavLink></li>
				<li onClick={() => { setMenu("womans") }}><NavLink onClick={closeMenuHandler} to="/womans" replace={true}>Women</NavLink></li>
				<li onClick={() => { setMenu("kids") }}><NavLink onClick={closeMenuHandler} to="/kids" replace={true}>Kids</NavLink></li>
				<li onClick={() => { setMenu("about") }}><NavLink onClick={closeMenuHandler} to="/about" replace={true}>About</NavLink></li>
				<li onClick={() => { setMenu("contacts") }}><NavLink onClick={closeMenuHandler} to="/contacts" replace={true}>Contacts</NavLink></li>
				<IoClose onClick={closeMenuHandler} className='closeNavbar' />
			</ul>
			<div className="nav-login-cart">
				{localStorage.getItem("auth-token") ?
					<button className='logoutBtn' onClick={() => { localStorage.removeItem("auth-token"); window.location.replace("/") }}>Logout</button>
					:
					<NavLink to="/login"><button className='loginBtn'>Login</button></NavLink>}
				<NavLink to="/cart"><GiShoppingCart className="nav-login-cart-img" /></NavLink>
				<div className="nav-cart-count">{getTotalCartItems()}</div>
			</div>
			<GiHamburgerMenu onClick={openMenuHandler} className='hamburger' />
		</div>
	)
}

export default Navbar
