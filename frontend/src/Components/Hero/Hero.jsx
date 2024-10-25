import React from 'react'
import "./Hero.css"
import arrow_icon from "../Assets/arrow.png"
import hero_image from "../Assets/hero_image.jpeg"
import { useNavigate } from 'react-router-dom'

const Hero = () => {

	const navigate = useNavigate()

	return (
		<div className='hero'>
			<div className="hero-left">
				<h1 className='main-header-text'>New Arrivals Only</h1>
				<div className='headers'>
					<h1>New</h1>
					<h1>Collections</h1>
					<h1>For everyone</h1>
				</div>
				<div onClick={() => navigate("/new-collection")} className="hero-latest-btn">
					<div>Latest Collection</div>
					<img src={arrow_icon} alt="" />
				</div>
			</div>
			<div className="hero-right">
				<img className='hero-right-img' src={hero_image} alt="" />
			</div>
		</div>
	)
}

export default Hero
