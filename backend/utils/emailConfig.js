const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // true for port 465, false for other ports
	auth: {
	  user: "greeftechnologies1@gmail.com",
	  pass: "uvmg tuph hxaf oxde",
	},
  });

  module.exports = {transporter}