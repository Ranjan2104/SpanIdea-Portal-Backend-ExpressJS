require("dotenv").config();
const express = require('express');
const cors = require('cors');
const getUsers = require('./routes/getUsers');
const addUser = require('./routes/addUser');
const userLogin = require('./routes/userLogin');
const otpVerify = require('./routes/otpVerify');

let port = process.env.PORT || 3030;

const app = express();
 
app.use(express.json());
app.use(express.urlencoded());
app.use(cors()); 
app.get('/api/v1/getUsers', getUsers);
app.post('/api/v1/addUser', addUser);
app.post('/api/v1/userLogin', userLogin);
app.post('/api/v1/otpVerify', otpVerify);


app.listen(port, () => {
    console.log(`Server is Running at port ${port}`);
})