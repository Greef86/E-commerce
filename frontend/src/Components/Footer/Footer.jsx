import React from 'react'
import "./Footer.css"
import logo from "../Assets/logo.png"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaRegCopyright, FaTiktok } from 'react-icons/fa'
import { useNavigate } from "react-router-dom"

const Footer = () => {

	const go_to = useNavigate()

	return (
		<div className='footer'>
			<div className="footer-container">
				<div className="logo-socials">
					<img className='logo-img' src={logo} alt="" />
					<div className="socials">
						<h2>Follow Us</h2>
						<div className="social-links">
							<a rel="noreferrer" target='_blank' href="https://www.facebook.com/profile.php?id=100088179311986"><FaFacebook size={20} className='icon' /></a>
							<a rel="noreferrer" target='_blank' href="https://x.com/LesleyGree28850?t=rqdu9dVBHTDnjWBm5RVHuw&s=09"><FaTwitter size={20} className='icon' /></a>
							<a rel="noreferrer" target='_blank' href="https://www.instagram.com/greeftechnologies?igsh=YzljYTk1ODg3Zg=="><FaInstagram size={20} className='icon' /></a>
							<a rel="noreferrer" target='_blank' href="https://www.linkedin.com/in/lesley-greef-127602273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin size={20} className='icon' /></a>
							<a rel="noreferrer" target='_blank' href="https://vm.tiktok.com/ZMBd1XNFf/"><FaTiktok size={20} className='icon' /></a>
						</div>
					</div>
				</div>
				<div className="logo-address">
					<div className="address-div">
						<h2>Contact</h2>
						<div className="address-types">
							<p><strong>Phone: </strong>+27719296756</p>
							<p><strong>Email: </strong>greeftechnologies1@gmail.com</p>
							<p><strong>Address: </strong>North West, Mafikeng No. 2745</p>
							<p><strong>Hours: </strong>09:00 - 17:00 Weekdays, 09:00 - 13:00 Saturdays</p>
						</div>
					</div>
				</div>
				<div className="privacy-policy-about-conditions">
					<h2>About</h2>
					<div className="about-links">
						<p onClick={() => go_to("/about")}>About Us</p>
						<p>Delivery Infomation</p>
						<p onClick={() => go_to("/privacypolicy")}>Privacy & Policy</p>
						<p onClick={() => go_to("/termsconditions")}>Terms & Conditions</p>
						<p onClick={() => go_to("/contacts")}>Contact Us</p>
					</div>
				</div>
			</div>
			<p className='copyright'><FaRegCopyright /> 2024 <strong><i>GreefTechnologies</i></strong></p>
		</div>
	)
}

export default Footer
