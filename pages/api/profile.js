const mysql = require('../../lib/db');

const handler = async(req, res) => {
    if(req.method == 'GET') {
        if(req.query.id) { // The user id
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                conn.query("SELECT `userid`, `username`, `points` FROM `users` WHERE `userid` = ?", [req.query.id], async(err, results) => {
                    if (err) throw err;
                    if (results.length > 0) {
                        res.send({results})  
                    }
                    else {
                        res.send({error: "There was an error"});
                    }
                });
                mysql.pool.releaseConnection(conn);
            });
        }
        else if (req.query.qid) { // Qid means Questions @ the user id specified
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                conn.query("SELECT `questionid`, `question`, DATE_FORMAT (`askdate`, '%m/%d/%Y @ %h:%i%p') as `askdate`  FROM `questions` WHERE `authorid` = ?", [req.query.qid], async(err, results) => {
                    if (err) throw err;
                    if (results.length > 0) {
                        res.send({results});
                    }
                    else if (results && results.length == 0) {
                        res.send({noResults: "No questions found at that id."});
                    }
                    else {
                        res.send({listError: "There was an error."});
                    }
                })
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