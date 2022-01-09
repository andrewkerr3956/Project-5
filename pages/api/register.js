const mysql = require('./../../lib/db');
const bcrypt = require('bcrypt');

const handler = async (req, res) => {
    const success = "Registration successful!";
    const error = "There was an error.";
    const existsError = "The user already exists.";
    const methodError = "This method is forbidden for the requested resource."
    if (req.method == 'POST') { // This method will insert the user into the database
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            // Check if the username already exists in the database
            conn.query("SELECT * FROM `users` WHERE `username` = ?", [req.body.username], async (err, results) => {
                if (err) throw err;
                if (results.length > 0) {
                    res.send({ existsError });
                }
                else {
                    // Insert the user into the database since the user does not already exist
                    conn.query("INSERT INTO `users` (`username`, `password`) VALUES (?, ?)", [req.body.username, bcrypt.hashSync(req.body.password, 10)], async (err, results) => {
                        if (err) throw err;
                        else {
                            res.send({ success });
                            console.log(results);
                        }
                    });
                }
                mysql.pool.releaseConnection(conn);
            });

        });
    }
    else if (req.method == 'PUT') { // This method will update the user in the database.
        console.log("This method will be working soon!");
    }
    else {
        console.log(methodError);
        res.send({ methodError });
    }
}

export default handler;