import React from 'react'
import "./NewsLetter.css"

const NewsLetter = () => {

	window.onbeforeunload = () => {
		for (const form of document.getElementsByTagName("form")) {
			form.reset()
		}
	}

	return (
		<div className='newsletter'>
			<h1 className='main-header-text'>Get Notified About Our Latest Products</h1>
			<h2>Subscribe To Our News Letter Service</h2>
			<form action="https://formspree.io/f/manyndgk" method="POST" className='newsletter-input-div'>
				<input type="email" name="email" id="email" placeholder='Your email address' required />
				<button type='submit'>Subscribe</button>
			</form>
		</div>
	)
}

export default NewsLetter
