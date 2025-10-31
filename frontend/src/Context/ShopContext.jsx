import React, { createContext, useState, useEffect } from 'react'
import {backendUrl} from "../Constants"
//I will remove this
// import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
											
	const [all_product, setAll_product] = useState([])
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		const storedArr = localStorage.getItem("CartItems")
		if(storedArr){
			setCartItems(JSON.parse(storedArr))
		}else{
			localStorage.setItem("CartItems", JSON.stringify([]))
		}
	}, [])

	useEffect(() => { 
		fetch(`${backendUrl}/allproducts`).then((response) => response.json()).then((data) => setAll_product(data))
	}, [])

	const addToCart = (itemId, size) => {
		fetch(`${backendUrl}/addtocart`, {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ itemId, size }),
		}).then((response) => response.json()).then((data) => {
			const newArr = [...cartItems, data]
			setCartItems(newArr)
			localStorage.setItem("CartItems", JSON.stringify(newArr))
		})
	}

	const removeFromCart = (itemId, size) => {
		const storedArr = JSON.parse(localStorage.getItem("CartItems"))
		if(storedArr?.length > 0){
			for(let item of storedArr){
				if(`${item.id},${item.size}` === `${itemId},${size}`){
					storedArr.splice(storedArr.indexOf(item), 1)

					setCartItems(storedArr)
					localStorage.setItem("CartItems", JSON.stringify(storedArr))
					return
				}
			}
		}
	}

	const clearCart = () => {
		setCartItems([])
		localStorage.setItem("CartItems", JSON.stringify([]))
	}

	const getTotalCartAmount = () => {
		let totalAmount = 0
		for (const item of cartItems) {
			totalAmount += item.new_price
		}
		return totalAmount
	}

	const getTotalCartItems = () => {
		let totalItem = 0
		const storedArr = JSON.parse(localStorage.getItem("CartItems"))
		if(storedArr?.length > 0){
			return storedArr.length
		}
		return totalItem
	}

	const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems, clearCart }

	return (
		<ShopContext.Provider value={contextValue}>
			{props.children}
		</ShopContext.Provider>
	)

}

export default ShopContextProvider
