import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or another email provider (e.g., "hotmail", "outlook")
  auth: {
    user: process.env.EMAIL_USER, // Ensure this is set
    pass: process.env.EMAIL_PASS, // Ensure this is set
  },
});

export const mailOptions = {
  from: process.env.EMAIL_USER, // Your email
  to: "@example.com", // Change this to the actual recipient
};
