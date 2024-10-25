import React, { useState } from 'react'
import "./LoginSignup.css"
import OtpModal from '../Components/OtpModal/OtpModal'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner"

const LoginSignup = () => {

	const [state, setState] = useState("Login")
	const [error, setError] = useState(null)
	const [otpModal, setOtpModal] = useState(false)
	const [loadingForgotPassword, setLoadingForgotPassword] = useState(false)
	const [loadingSignin, setLoadingSignin] = useState(false)
	const [userEmail, setUserEmail] = useState(null)
	const [token, setToken] = useState(null)
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		email: ""
	})
	const navigate = useNavigate()

	const changeHandler = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const login = async () => {
		setLoadingSignin(true)
		console.log("Login Function executed", formData)
		let responseData
		await fetch("https://e-commerce-backend-1zj4.onrender.com/login", {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then((response) => response.json()).then((data) => responseData = data)
		if (responseData.success) {
			localStorage.setItem("auth-token", responseData.token)
			setLoadingSignin(false)
			window.location.replace("/")
		} else {
			setLoadingSignin(false)
			setError(responseData.errors)
		}
	}

	const signup = async () => {
		setLoadingSignin(true)
		setUserEmail(formData.email)
		console.log("Signup function executed", formData)
		let responseData
		await fetch("https://e-commerce-backend-1zj4.onrender.com/signup", {
			method: "POST",
			headers: {
				Accept: "application/form-data",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		}).then((response) => response.json()).then((data) => responseData = data)
		if (responseData.success) {
			setToken(responseData.token)
			setLoadingSignin(false)
			setOtpModal(true)
		} else {
			setLoadingSignin(false)
			setError(responseData.errors)
		}
	}

	const forgotPasswordHandler = async () => {
		setLoadingForgotPassword(true)
		const response = await fetch("https://e-commerce-backend-1zj4.onrender.com/forgot-password", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: formData.email })
		})
		const data = await response.json()
		if (!response.ok) {
			setLoadingForgotPassword(false)
			setError(data.errors)
		} else {
			setLoadingForgotPassword(false)
			setError(null)
			navigate("/forgot-password", { state: { code: data, email: formData.email } })
		}
	}

	return (
		<div className='loginSignup'>
			<div className="loginSignup-container">
				<h1 className='signup-text'>{state}</h1>
				{otpModal && <div className='otpmodal'><OtpModal closeModal={setOtpModal} userEmail={userEmail} token={token} /></div>}
				<div className="loginSignup-fields">
					{error && <small style={{ color: "red" }}>{error}</small>}
					{state === "SignUp" ? <input type="text" value={formData.username} onChange={changeHandler} name="username" placeholder='Name' /> : <></>}
					<input type="email" value={formData.email} onChange={changeHandler} name="email" placeholder='Email Address' autoFocus />
					<input type="password" value={formData.password} onChange={changeHandler} name="password" placeholder='Password' />
				</div>
				<button className='btnSubmit'>{loadingSignin ? <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
					<RotatingLines width='30' strokeColor='white' />
					<RotatingLines width='30' strokeColor='white' />
					<RotatingLines width='30' strokeColor='white' />
				</div> : <div onClick={() => { state === "Login" ? login() : signup() }}>Continue</div>}</button>
				{state === "SignUp" ?
					<p className='loginSignup-login'>Already have an account? <span onClick={() => { setState("Login") }} className='login-span'>Login</span></p>
					:
					<div className='forgot-password-login'>
						{loadingForgotPassword ? <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
							<RotatingLines width='30' strokeColor='white' />
							<RotatingLines width='30' strokeColor='white' />
							<RotatingLines width='30' strokeColor='white' />
						</div> : <p onClick={() => forgotPasswordHandler()} className='forgot-password'>I forgot my password</p>}
						<p className='loginSignup-login'>I do not have an account <span onClick={() => { setState("SignUp") }} className='login-span'>SignUp</span></p>
					</div>}
				<div className="loginSignup-agree">
					<input type="checkbox" name="" id="" />
					<p>I Agree to the terms of use and privacy policy.</p>
				</div>
			</div>
		</div>
	)
}

export default LoginSignup
