const mysql = require('../../lib/db');

const handler = async(req, res) => {
    if(req.method == 'GET') {
        if(req.query.id) {
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                conn.query("SELECT * FROM `users` WHERE `userid` = ?", [req.query.id], async(err, results) => {
                    if (err) throw err;
                    if (results.length > 0) {
                        res.send({results});
                    }
                    else {
                        res.send({error: "There was an error"});
                    }
                });
                conn.release(); 
            });
        }
        else {
            res.send({error: "There was an error with the query."});
        }
    }
    else {
        res.send({error: "That method is not allowed."});
    }
}

export default handler;