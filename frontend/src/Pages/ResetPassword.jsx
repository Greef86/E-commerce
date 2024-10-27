import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RotatingLines } from "react-loader-spinner"

const ResetPassword = () => {

	const { state } = useLocation()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const resetPasswordHandler = async () => {
		try {
			setLoading(true)
			const response = await fetch("https://e-commerce-backend-1zj4.onrender.com/password-reset", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: state, password, confirmPassword })
			})
			const data = await response.json()
			if (!response.ok) {
				setLoading(false)
				setError(data.errors)
			} else {
				setLoading(false)
				setError(null)
				window.alert(data)
				window.location.replace("/")
			}
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<div style={{ backgroundColor: "white", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
			<div className="forgot-password-container">
				<h6 style={{ color: "white", fontSize: "2rem" }}>Reset Password</h6>
				<div className="loginSignup-fields">
					{error && <small style={{ color: "red" }}>{error}</small>}
					<input type="password" value={password} onChange={(event) => setPassword(event.target.value)}
						name="password" placeholder='New Password' autoFocus />
					<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
						name="confirmPassword" placeholder='Confirm Password' />
				</div>
				<button onClick={() => resetPasswordHandler()} className='btnSubmit'>{
					loading ? <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
						<RotatingLines width='30' strokeColor='white' />
						<RotatingLines width='30' strokeColor='white' />
						<RotatingLines width='30' strokeColor='white' />
					</div> : "Reset Password"}</button>
			</div>
		</div>
	)
}

export default ResetPassword
