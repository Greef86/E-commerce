import React from 'react'
import "./Contacts.css"
import NewsLetter from "../Components/NewsLetter/NewsLetter.jsx"
import { FaPhoneAlt, FaClock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import employee1 from "../Components/Assets/employee1.jpg"
import employee2 from "../Components/Assets/employee2.jpg"
import employee3 from "../Components/Assets/employee3.jpg"

const Contacts = (props) => {

	window.onbeforeunload = () => {
		for (const form of document.getElementsByTagName("form")) {
			form.reset()
		}
	}

	return (
		<div className='contactsContainer'>
			<div className="banner">
				<img src={props.banner} alt="" />
			</div>
			<div className="mapContainer">
				<div className="contact">
					<h1>Get in touch or visit us</h1>
					<h3>Postal address</h3>
					<address>
						GreefTechnologies Head Office<br />
						Mafikeng, North West<br />
						Private Bag X3244<br />
						Mmabatho<br />
						2745
					</address>
					<h3>Physical address</h3>
					<address>
						GreefTechnologies Head Office<br />
						Mafikeng, North West<br />
						Corner of Vukani Mawethu<br />
						Rethabile Drive<br />
						Mmabatho<br />
						2745
					</address>
					<div className="contacts">
						<p><FaPhoneAlt /> 086 245 4129</p>
						<p><MdEmail style={{ fontSize: "1.1rem" }} /> greeftechnologies1@gmail.com</p>
						<p><FaClock /> 09:00 - 16:00</p>
					</div>
				</div>
				<div className="map">
					<iframe width="100%" height="100%" frameBorder="no" title='googlemap' src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Mmabatho%20Unit%205,%20Mahikeng,%202790+(GreefTechnologies)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>
				</div>
			</div>
			<div className="contactForm">
				<div className="form">
					<h2>We love to hear from you, leave a message</h2>
					<form action="https://formspree.io/f/mzzbzalp" method="POST" className="inputs">
						<input type="text" name="name" id="name" placeholder='Name' required />
						<input type="email" name="email" id="email" placeholder='Email' required />
						<input type="text" name="subject" id="subject" placeholder='Subject' required />
						<textarea name="body" id="body" placeholder="What's on your mind?" required />
						<button type="submit">Submit</button>
					</form>
				</div>
				<div className="employees">
					<div className="personel">
						<div className='image'>
							<img src={employee2} alt="" />
						</div>
						<div className='info'>
							<p><strong>Thebe Mahube</strong></p>
							<p>Marketing Director</p>
							<p>Phone: 081 149 1476</p>
							<p>Email: thebemahube@gmail.com</p>
						</div>
					</div>
					<div className="personel">
						<div className='image'>
							<img src={employee1} alt="" />
						</div>
						<div className='info'>
							<p><strong>Alvin Sivatre</strong></p>
							<p>Public Relations</p>
							<p>Phone: 060 457 2169</p>
							<p>Email: alvinsivatre@gmail.com</p>
						</div>
					</div>
					<div className="personel">
						<div className='image'>
							<img src={employee3} alt="" />
						</div>
						<div className='info'>
							<p><strong>Ntokozo Khumalo</strong></p>
							<p>Social Media Administrator</p>
							<p>Phone: 071 529 049</p>
							<p>Email: ntokozokhumalo@gmail.com</p>
						</div>
					</div>
				</div>
			</div>
			<NewsLetter />
		</div>
	)
}

export default Contacts
