import React from 'react'
import "./PaymentStyle.css"

const Cancel = () => {

	return (
		<div className="maincontainer-payment">
			<div className='payment-cancel'>
				<h1>Payment Cancelled</h1>
				<div className="back-btns">
					<button onClick={() => window.location.replace("/")}>Back to home</button>
					<button onClick={() => window.location.replace("/cart")}>Back to cart</button>
				</div>
			</div>
		</div>
	)
}

export default Cancel