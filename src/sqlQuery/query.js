const addUserQuery = `INSERT INTO user_data (firstname, lastname, userid, otp, createddate, updateddate, isactive, email, phnumber, token)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;

const getUserQuery = `SELECT * from user_data`;

const otpVerifyCheckQuery = `SELECT * FROM user_data WHERE email = $1 AND otp = $2`;

const otpVerifyUpdateQuery = `UPDATE user_data SET token = $1 WHERE email = $2`;

const userLoginCheckQuery = `SELECT * FROM user_data WHERE email = $1`;

const userLoginUpdateQuery = `UPDATE user_data SET otp = $1 WHERE email = $2`;


module.exports = { 
    addUserQuery,
    getUserQuery,
    otpVerifyCheckQuery,
    otpVerifyUpdateQuery,
    userLoginCheckQuery,
    userLoginUpdateQuery
 }