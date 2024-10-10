import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { email } = await req.json()

  // Configure your email service
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const resumeLink = "https://docs.google.com/document/d/13D3TTTCmo1jy-n3M97PDRNIX8qxeeH2JWKi5XEGd_bk/edit?usp=sharing" // Replace with your actual resume link

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Requested Resume',
    text: `Thank you for requesting my resume. You can access it here: ${resumeLink}`,
    html: `<p>Thank you for requesting my resume. You can access it <a href="${resumeLink}">here</a>.</p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}