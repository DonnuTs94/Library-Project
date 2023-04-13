const nodemailer = require("nodemailer")

const emailer = async ({ to, subject, text, html }) => {
  if (!to)
    throw new Error(
      "Email needs recipient email address. `to` parameter is missing"
    )

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "danar.bastian28@gmail.com",
      pass: "aroygekvfugihepo",
    },
  })
  await transporter.sendMail({
    to, // Receiver
    subject, // Email subject
    text, // Body email in text form
    html, // Body email in html form
  })
}

module.exports = emailer
