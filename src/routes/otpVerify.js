const pool = require("../database/query");
const jwt = require('jsonwebtoken');
const { otpVerifyCheckQuery, otpVerifyUpdateQuery } = require('../sqlQuery/query')

const otpVerify = async (req, res) => {
  const { email, otp } = req.body;
  const query = otpVerifyCheckQuery;
  const values = [email, otp];
  const getResults = await pool.query(query, values);
  if (getResults.rowCount === 0) {
    res
      .status(410)
      .json({
        message: "OTP verified failed",
        success: false
      });
  } else {
    const token = jwt.sign({ foo: email }, 'spanIdea Portal');
    await pool.query(otpVerifyUpdateQuery, [token, email]);
    res
      .status(200)
      .json({
        message: "OTP verified successfully",
        success: true,
        token: token,
        email: email,
        name: getResults.rows[0].firstname + " " + getResults.rows[0].lastname
      });
  }
};

module.exports = otpVerify;
