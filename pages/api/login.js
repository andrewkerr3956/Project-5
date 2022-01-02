let bcrypt = require('bcrypt');
let mysql = require('../../lib/db.js');

const handler = async (req, res) => {
    const error = "There was an error."
    const success = "Successfully logged in!";
    if (req.method == 'POST') {
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query("SELECT * FROM `users` WHERE `username` = ?", [req.body.username], async (err, results) => {
                if(err) throw err;
                if(results.length > 0) { // If there is a match
                    let matchPassword = await bcrypt.compare(req.body.password.toString(), results[0].password.toString())
                    if(matchPassword) { // Check the supplied password against the one in the database.
                        console.log(success);
                        res.send({success, results}) 
                    }
                    else { // Passwords do not match
                        console.log(error);
                        res.send({error});
                    }
                }
                else { // There is no match found in the database.
                    console.log({error});
                    res.send({error});
                }
                conn.release();
            })
        })
    }
    else {
        const methodError = "The request method is invalid for this route."
        console.log(methodError)
        res.send({ methodError });
    }
}

export default handler;