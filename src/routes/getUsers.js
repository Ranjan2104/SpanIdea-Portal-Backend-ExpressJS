const pool = require('../database/query');
const {getUserQuery} = require('../sqlQuery/query')
const getUsers = async(req, res) => {
    await pool.query(getUserQuery, (err, results) => {
        if(err) {
            return err;
        }
        res.status(200).json(results.rows)
    })
}

module.exports = getUsers