import React, { useContext, useState } from 'react'
import "./ShopCategory.css"
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Items/Item'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

const ShopCategory = (props) => {
	const { all_product } = useContext(ShopContext)
	const [dropState, setDropState] = useState(true)

	const dropDownHandler = () => {
		const dropdownpanel = document.getElementById("ddc")
		dropdownpanel.classList.toggle("dropdown-active")
		setDropState(!dropState)
	}
	// console.log(all_product)
	const removeDropdownHandler = () => {
		const dropdownpanel = document.getElementById("ddc")
		dropdownpanel.classList.remove("dropdown-active")
		setDropState(true)
	}

	return (
		<div className='shop-category'>
			<div className="banner">
				<img src={props.banner} alt="" />
			</div>
			<div className="shopCategoryIndex-sort">
				<p>Showing Products</p>
				<div className="dropdown">
					<button onClick={dropDownHandler}>Sort by {dropState ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
					<div id='ddc' className="dropdown-content">
						<span onClick={() => {
							all_product.sort((a, b) => a.new_price - b.new_price)
							removeDropdownHandler()
						}}>{`Price: L -> H`}</span>
						<span onClick={() => {
							all_product.sort((a, b) => b.new_price - a.new_price)
							removeDropdownHandler()
						}}>{`Price: H -> L`}</span>
						<span onClick={() => {
							all_product.sort((a, b) => a.date.localeCompare(b.date))
							removeDropdownHandler()
						}}>{`Date: Old -> New`}</span>
						<span onClick={() => {
							all_product.sort((a, b) => b.date.localeCompare(a.date))
							removeDropdownHandler()
						}}>{`Date: New -> Old`}</span>
					</div>
				</div>
			</div>
			<div className="shopCategory-products">
				{all_product.map((item, i) => {
					if (props.category === item.category) {
						return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
					} else {
						return null
					}
				})}
			</div>
			<div className="shopCategory-loadmore">
				Explore More
			</div>
		</div>
	)
}

export default ShopCategory
