import React from 'react'
import "./Sidebar.css"
import { NavLink } from "react-router-dom"
import { BsDatabaseAdd } from "react-icons/bs"
import { FaListUl } from "react-icons/fa"

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<NavLink to={"/"} style={{ textDecoration: "none" }}>
				<div className="sidebar-item">
					<BsDatabaseAdd className='add-icon icon' />
					<p>Add Product</p>
				</div>
			</NavLink>
			<NavLink to={"/listproduct"} style={{ textDecoration: "none" }}>
				<div className="sidebar-item">
					<FaListUl className='list-icon icon' />
					<p>Product List</p>
				</div>
			</NavLink>
		</div>
	)
}

export default Sidebar
