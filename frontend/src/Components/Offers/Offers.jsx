import React from 'react'
import "./Offers.css"
import offers_adidas from "../Assets/offers_adidas.jpeg"
import offers_nike from "../Assets/offers_nike.jpeg"
import offers_puma from "../Assets/offers_puma.jpeg"

const Offers = () => {
	return (
		<div className='offers'>
			<div className="offers-left">
				<div className="align-start">
					<div className="text_btn">
						<h1 className='main-header-text'>Exclusive</h1>
						<h1 className='main-header-text'>Offers For You</h1>
						<button>Check Now</button>
					</div>
					<div className="offers-left-img-div">
						<img src={offers_nike} alt="" />
					</div>
				</div>
			</div>
			<div className="offers-right">
				<div className="offers-right-img-div">
					<img src={offers_adidas} alt="" />
				</div>
				<div className="offers-right-img-div">
					<img src={offers_puma} alt="" />
				</div>
			</div>
		</div>
	)
}

export default Offers
