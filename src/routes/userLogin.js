const pool = require("../database/query");
const nodemailer = require("nodemailer");
const { userLoginCheckQuery, userLoginUpdateQuery } = require('../sqlQuery/query');

const userLogin = async (req, res) => {
  const { email } = req.body;
  const query = userLoginCheckQuery;
  const values = [email];

  try {
    const getResult = await pool.query(query, values);

    if (getResult.rowCount === 0) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    } 
    else {
      const otp = generateOTP();
      const result = await getOTP(email, otp);
      if (result) {
        const updateQuery = userLoginUpdateQuery;
        await pool.query(updateQuery, [otp, email]);
        res.status(200).json({
          message: "OTP sent successfully",
          success: true
        });
      } 
      else {
        res.status(400).json({
          message: "OTP send failed, please try again",
          success: false,
        });
      }
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Something went wrong", success: false });
  }
};

const getOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: email,
      subject: "OTP for login",
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to SpanIdea Portal</h2>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>
    `,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

function generateOTP() {
  let digits = "0123456789";
  let otpLength = 5;
  let otp = "";
  for (let i = 1; i <= otpLength; i++) {
    let index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
}

module.exports = userLogin;
