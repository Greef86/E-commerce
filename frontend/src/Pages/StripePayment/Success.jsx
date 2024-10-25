import React from 'react'
import "./PaymentStyle.css"

const Success = () => {
	return (
		<div className="maincontainer-payment">
			<div className='payment-succeed'>
				<h1>Payment Successful</h1>
				<div className="back-btns">
					<button onClick={() => window.location.replace("/")}>Back to home</button>
				</div>
			</div>
		</div>
	)
}

export default Success