import React, { useContext, useState } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import { Link } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { RotatingLines } from "react-loader-spinner"

const CartItems = () => {

	const { all_product, cartItems, removeFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext)
	const cartItemsArray = new Set()
	const [redirectToCheckout, setRedirectToCheckout] = useState(false)
	const [redirectError, setRedirectError] = useState(null)

	let arrayOfItems = []
	all_product.map((product) => {
		if (cartItems[product.id].quantity > 0) {
			cartItemsArray.add({
				productId: product.id, name: product.name,
				price: product.new_price, quantity: cartItems[product.id].quantity,
				size: cartItems[product.id].size, total: product.new_price * cartItems[product.id].quantity,
				image: product.image
			})
		}
	})
	arrayOfItems = Array.from(cartItemsArray)

	// console.log(all_product)
	// console.log(cartItems)
	// console.log(arrayOfItems)

	const sizeCount = (sizeArray, size) => {
		let count = 0
		for (let i = 0; i < sizeArray?.length; i++) {
			if (sizeArray[i] === size) {
				count++
			}
		}
		return count
	}

	let stripe
	const make_payment = async () => {
		setRedirectToCheckout(true)
		if (!stripe) {
			stripe = await loadStripe("pk_test_51Q9qAzFNDSAGYPtQ4fAfdMBUb1N6bHtQwPHhslcJjvS9nCKeupYQ3o1NSFhtUaT0V8rgrI7348mxspWDY0BEtjGW00PpU0NXqH")
		}
		console.log(stripe)
		const response = await fetch("https://e-commerce-backend-1zj4.onrender.com/create-checkout-session", {
			method: "POST",
			headers: {
				"auth-token": `${localStorage.getItem("auth-token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ products: arrayOfItems })
		})
		const session = await response.json()
		if (!response.ok) {
			setRedirectToCheckout(false)
			window.alert("Something went wrong on the server side!")
		} else {
			setRedirectToCheckout(false)
			const { error } = stripe.redirectToCheckout({
				sessionId: session.id
			})
			console.log("Stripe checkout error!", error)
		}
	}

	try {
		return (
			<div className='cartitems'>
				<div className="cartItems-format-main">
					<p>Products</p>
					<p>Title</p>
					<p className="same-width">Price</p>
					<p className="quantity-width">Quantity</p>
					<p className="size-width">Size</p>
					<p className="same-width">Total</p>
					<p className="same-width">Remove</p>
				</div>
				<hr />
				{!all_product && <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
					<RotatingLines width='30' strokeColor='white' />
					<RotatingLines width='30' strokeColor='white' />
					<RotatingLines width='30' strokeColor='white' />
				</div>}
				{all_product.map((e) => {
					if (cartItems[e.id].quantity > 0) {
						return (
							<div key={e.id}>
								<div className="cartItems-format">
									<img src={e.image} alt="" className='cartIcon-product-icon' />
									<p className="name">{e.name}</p>
									<p className="same-width">R{e.new_price}</p>
									<p className="quantity-width">{cartItems[e.id].quantity}</p>
									<div className="size-width">
										<div style={{ display: "flex", flexDirection: "column" }}>
											{sizeCount(cartItems[e.id].size, "XL") !== 0 ? <small>{sizeCount(cartItems[e.id].size, "XL")} XL</small> : <></>}
											{sizeCount(cartItems[e.id].size, "L") !== 0 ? <small>{sizeCount(cartItems[e.id].size, "L")} L</small> : <></>}
											{sizeCount(cartItems[e.id].size, "M") !== 0 ? <small>{sizeCount(cartItems[e.id].size, "M")} M</small> : <></>}
											{sizeCount(cartItems[e.id].size, "S") !== 0 ? <small>{sizeCount(cartItems[e.id].size, "S")} S</small> : <></>}
										</div>
									</div>
									<p className="same-width">R{e.new_price * cartItems[e.id].quantity}</p>
									<p className='same-width removeBtn' onClick={() => { removeFromCart(e.id) }}>X</p>
								</div>
								<hr />
							</div>
						)
					}
					return null
				})}
				<div className="cartItems-down">
					<div className="cartItems-total">
						<h1>Cart Total</h1>
						<div>
							<div className="cartItems-total-item">
								<p>Subtotal</p>
								<p>R{getTotalCartAmount()}</p>
							</div>
							<hr />
							<div className="cartItems-total-item">
								<p>Shipping Fee</p>
								<p>Free</p>
							</div>
							<hr />
							<div className="cartItems-total-item">
								<h3>Total</h3>
								<h3>R{getTotalCartAmount()}</h3>
							</div>
						</div>
						{localStorage.getItem("auth-token") && getTotalCartAmount() !== 0 && <button onClick={() => {
							make_payment()
							clearCart(arrayOfItems)
						}}>{redirectToCheckout ? <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
							<RotatingLines width='30' strokeColor='white' />
							<RotatingLines width='30' strokeColor='white' />
							<RotatingLines width='30' strokeColor='white' />
						</div> : "Proceed To Checkout"}</button>}
					</div>
				</div>
			</div>
		)
	} catch (error) {
		<Link to="/" replace={true}></Link>
	}
}

export default CartItems
