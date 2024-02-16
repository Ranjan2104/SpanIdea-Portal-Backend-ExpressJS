const pool = require("../database/query");
const {addUserQuery} = require('../sqlQuery/query')

const addUser = async (req, res) => {
  const {
    firstname,
    lastname,
    userid,
    otp,
    createddate,
    updateddate,
    isactive,
    email,
    phnumber,
    token,
  } = req.body;

  const query = addUserQuery;
  const values = [
    firstname,
    lastname,
    userid,
    otp,
    createddate,
    updateddate,
    isactive,
    email,
    phnumber,
    token,
  ];

  try {
    await pool.query(query, values);
    res.status(200).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while adding user" });
  }
};

module.exports = addUser;
