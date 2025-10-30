const { transporter } = require("./emailConfig")


const sendVerificationCode = async (email, verificationCode) => {
	try {
		const response = await transporter.sendMail({
			from: '"greeftechnologies" <greeftechnologies1@gmail.com>', // sender address
			to: email, // list of receivers
			subject: "Verify Your Email Account", // Subject line
			text: "Verify Your Email Account", // plain text body
			html: `Use OTP: ${verificationCode}, to verify your email account.`, // html body
		})
		console.log("Email Sent Successfully", response)
	} catch (error) {
		console.log("Email Sent Error", error)
	}
}

module.exports = {sendVerificationCode}