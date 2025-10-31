import React, { useContext, useState } from 'react'
import "./CartItems.css"
import { ShopContext } from '../../Context/ShopContext'
import { Link } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import { RotatingLines } from "react-loader-spinner"
import {backendUrl} from "../../Constants"

const CartItems = () => {

	const { all_product, cartItems, removeFromCart, getTotalCartAmount, clearCart } = useContext(ShopContext)
	const [redirectToCheckout, setRedirectToCheckout] = useState(false)

	const cartData = (cartItems) => {
		return [...new Set(cartItems.map(JSON.stringify))].map(JSON.parse)
	}

	const countDuplicates = (product) => {
		let count = 0
		for(let item of cartItems){
			if(`${item.id},${item.size}` === `${product.id},${product.size}`){
				count++
			}
		}
		return count
	}

	const stripeDataArr = () => {
		const map = new Map()
		cartItems.forEach(obj => {
			const mapKey = `${obj.id},${obj.size}`
			if(map.has(mapKey)){
				const existing = map.get(mapKey)
				existing.count += 1
			}else{
				map.set(mapKey, {...obj, count: 1})
			}
		})
		return Array.from(map.values())
	}

	console.log(stripeDataArr())

	let stripe
	const make_payment = async () => { 
		setRedirectToCheckout(true)
		if (!stripe) {
			stripe = await loadStripe("pk_test_51Q9qAzFNDSAGYPtQ4fAfdMBUb1N6bHtQwPHhslcJjvS9nCKeupYQ3o1NSFhtUaT0V8rgrI7348mxspWDY0BEtjGW00PpU0NXqH")
		}
		console.log(stripe)
		const response = await fetch(`${backendUrl}/create-checkout-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ products: stripeDataArr() })
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
				{all_product?.length === 0 && <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
					<RotatingLines width='30' strokeColor='black' />
					<RotatingLines width='30' strokeColor='black' />
					<RotatingLines width='30' strokeColor='black' />
				</div>}
				{cartItems.length > 0 && cartData(cartItems).map((e) => {
					return (
							<div key={`${e.id},${e.size}`}>
								<div className="cartItems-format">
									<img src={e.image} alt="" className='cartIcon-product-icon' />
									<p className="name">{e.name}</p>
									<p className="same-width">R{e.new_price}</p>
									<p className="quantity-width">{countDuplicates(e)}</p>
									<div className="size-width">
										<div style={{ display: "flex", flexDirection: "column" }}>
											<small>{e.size}</small>
										</div>
									</div>
									<p className="same-width">R{e.new_price * countDuplicates(e)}</p>
									<p className='same-width removeBtn' onClick={() => { removeFromCart(e.id, e.size) }}>X</p>
								</div>
								<hr />
							</div>
						)
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
						{localStorage.getItem("CartItems") && getTotalCartAmount() !== 0 && <button onClick={() => {
							make_payment()
							clearCart()
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
