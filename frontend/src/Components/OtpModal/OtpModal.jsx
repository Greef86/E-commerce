import React, { useEffect, useState } from 'react'
import "./OtpModal.css"
import { LuClock10 } from "react-icons/lu"

const OtpModal = ({ closeModal, userEmail, token }) => {

	const [digit1, setDigit1] = useState("")
	const [digit2, setDigit2] = useState("")
	const [digit3, setDigit3] = useState("")
	const [digit4, setDigit4] = useState("")
	const [digit5, setDigit5] = useState("")
	const [digit6, setDigit6] = useState("")
	const [count, setCount] = useState(90)
	const [error, setError] = useState(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(count - 1)
		}, 1000)
		if (count === 0) {
			closeModal(false) 
			fetch("https://onlinestore-backend-hjyg.onrender.com/destroy-user", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: userEmail })
			}).then((response) => response.json()).then((data) => console.log(data))
			localStorage.removeItem("auth-token")
		}
		return () => clearInterval(interval)
	}, [count])

	const verifyAccount = async () => {
		const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`
		console.log(otp)
		const response = await fetch("https://onlinestore-backend-hjyg.onrender.com/verify-email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ code: otp })
		})
		const data = await response.json()
		setDigit1(""); setDigit2(""); setDigit3(""); setDigit4(""); setDigit5(""); setDigit6("")
		if (!response.ok) {
			setError(data.errors)
			console.log(data.errors)
		} else {
			localStorage.setItem("auth-token", token)
			closeModal(false)
			window.location.replace("/")
			console.log(data)
		}
	}

	const setFocus = (id) => {
		document.getElementById(id).focus()
	}

	return (
		<div className='otpmodal-container'>
			{error && <small style={{ color: "red" }}>{error}</small>}
			<h3>Verify your email account with OTP</h3>
			<div className='square-boxs-container'>
				<input id='1' value={digit1} onChange={(event) => { setDigit1(event.target.value); setFocus("2") }} maxLength="1" className='square-box' type="text" />
				<input id='2' value={digit2} onChange={(event) => { setDigit2(event.target.value); setFocus("3") }} maxLength="1" className='square-box' type="text" />
				<input id='3' value={digit3} onChange={(event) => { setDigit3(event.target.value); setFocus("4") }} maxLength="1" className='square-box' type="text" />
				<input id='4' value={digit4} onChange={(event) => { setDigit4(event.target.value); setFocus("5") }} maxLength="1" className='square-box' type="text" />
				<input id='5' value={digit5} onChange={(event) => { setDigit5(event.target.value); setFocus("6") }} maxLength="1" className='square-box' type="text" />
				<input id='6' value={digit6} onChange={(event) => setDigit6(event.target.value)} maxLength="1" className='square-box' type="text" />
			</div>
			<div>
				<small className='counter-clock'><LuClock10 /> {count} seconds left</small>
				<button onClick={() => verifyAccount()} className="verify-account">Verify Account</button>
			</div>
		</div>
	)
}

export default OtpModal
