import React, { createContext, useState, useEffect } from 'react'
//I will remove this
// import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null)

const getDefaultCart = () => {
	let cart = {}
	for (let index = 0; index < 300 + 1; index++) {
		cart[index] = 0
	}
	return cart
}

const ShopContextProvider = (props) => {

	const [all_product, setAll_product] = useState([])
	const [cartItems, setCartItems] = useState(getDefaultCart())

	console.log(cartItems)

	useEffect(() => {
		fetch("https://e-commerce-backend-1zj4.onrender.com/allproducts").then((response) => response.json()).then((data) => setAll_product(data))
		if (localStorage.getItem("auth-token")) {
			fetch("http://localhost:4000/getcart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: ""
			}).then((response) => response.json()).then((data) => setCartItems(data)).catch((data) => console.log(data.errors))
		}
	}, [])

	useEffect(() => {
		fetch("https://e-commerce-backend-1zj4.onrender.com/delete-useless-data", {
			method: "DELETE"
		}).then((response) => response.json()).then((data) => console.log(data))
	}, [])

	const addToCart = (itemId, size) => {
		setCartItems((prev) => ({ ...prev, [itemId]: { quantity: prev[itemId].quantity + 1, size: [...prev[itemId].size, size] } }))
		if (localStorage.getItem("auth-token")) {
			fetch("https://e-commerce-backend-1zj4.onrender.com/addtocart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ itemId, size }),
			}).then((response) => response.json()).then((data) => console.log(data))
		}
	}

	const removeFromCart = (itemId) => {
		cartItems[itemId].size.pop()
		setCartItems((prev) => ({ ...prev, [itemId]: { quantity: prev[itemId].quantity - 1, size: [...cartItems[itemId].size] } }))
		if (localStorage.getItem("auth-token")) {
			fetch("https://e-commerce-backend-1zj4.onrender.com/removefromcart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ "itemId": itemId }),
			}).then((response) => response.json()).then((data) => console.log(data))
		}
	}

	const clearCart = (cartitems) => {
		if (localStorage.getItem("auth-token")) {
			fetch("https://e-commerce-backend-1zj4.onrender.com/clearcart", {
				method: "POST",
				headers: {
					Accept: "application/form-data",
					"auth-token": `${localStorage.getItem("auth-token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cartitems }),
			}).then((response) => response.json()).then((data) => console.log(data))
		}
	}

	const getTotalCartAmount = () => {
		let totalAmount = 0
		for (const item in cartItems) {
			if (cartItems[item].quantity > 0) {
				let itemInfo = all_product.find((product) => product.id === Number(item))
				totalAmount += itemInfo.new_price * cartItems[item].quantity
			}
		}
		return totalAmount
	}

	const getTotalCartItems = () => {
		let totalItem = 0
		for (const item in cartItems) {
			if (cartItems[item].quantity > 0) {
				totalItem += cartItems[item].quantity
			}
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
