const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("Transporter is ready to send emails");
});

module.exports = transporter;
