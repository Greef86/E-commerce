import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./ForgotPassword.css"
import { RotatingLines } from "react-loader-spinner"

const ForgotPassword = () => {

	const { state } = useLocation()
	const [loader, setLoader] = useState(false)

	const [digit1, setDigit1] = useState("")
	const [digit2, setDigit2] = useState("")
	const [digit3, setDigit3] = useState("")
	const [digit4, setDigit4] = useState("")
	const [digit5, setDigit5] = useState("")
	const [digit6, setDigit6] = useState("")
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const resetPasswordHandler = async () => {
		setLoader(true)
		const otpFromUser = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`
		if (otpFromUser?.length !== 6) {
			setLoader(false)
			return setError("OTP code incomplete!")
		}
		if (otpFromUser === state.code) {
			setLoader(false)
			console.log("User OTP is equal to Machine OTP")
			navigate("/reset-password", { state: state.email, replace: true })
		} else {
			setLoader(false)
			return setError("User code does not match OTP!")
		}
	}

	const setFocus = (id) => {
		document.getElementById(id).focus()
	}

	return (
		<div className='forgot-password-otp-container'>
			<div className="container-for-forgot-password">
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
				<button className="verify-my-account-to-reset-password">{
					loader ? <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
						<RotatingLines width='30' strokeColor='white' />
						<RotatingLines width='30' strokeColor='white' />
						<RotatingLines width='30' strokeColor='white' />
					</div> : <div onClick={() => resetPasswordHandler()}>Verify Account</div>}
				</button>
			</div>
		</div>
	)
}

export default ForgotPassword
