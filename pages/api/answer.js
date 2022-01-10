// This route will deal with answers to questions
const mysql = require('./../../lib/db');

const handler = async (req, res) => {
    if (req.method == 'GET') {
        if(req.query) {
            if(req.query.qid) {
                console.log("GET Answers at Question ID");
                mysql.pool.getConnection((err, conn) => {
                    if (err) throw err;
                    conn.query("SELECT * FROM `vw_AnswerView` WHERE `questionid` = ?", [req.query.qid], async(err, results) => {
                        if (err) throw err;
                        if(results.length > 0) {
                            res.send({ results });
                        }
                        else {
                            res.send({ noResults: "There were no results" });
                        }
                    }); 
                    conn.destroy();
                });
            }
            else {
                res.send({ error: "There was an error." })
            }
        }
        else {
            res.send({ error: "Invalid" });
        }
    }
    else if (req.method == 'POST') {
        // Handle inserting an answer here.
        if (req.body.answer) {
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                conn.query("INSERT INTO `Answers` (`questionid`, `authorid`, `answer`, `answerdate`) VALUES (?, ?, ?, CURRENT_TIMESTAMP())", [req.body.questionid, req.body.authorid, req.body.answer], async (err, results) => {
                    if (err) throw err;
                    if (results) {
                        res.send({ success: "Answer successfully added!" });
                    }
                    else {
                        res.send({ error: "There was an error." })
                    }
                });
                conn.destroy();
            });
        }
        else {
            res.send({error: "There was an error." })
        }
    }
    else if (req.method == 'PUT') {
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query("UPDATE `answers` SET `answer` = ?, `editdate` = CURRENT_TIMESTAMP() WHERE `answerid` = ?", [req.body.answer, req.body.answerid], async(err, results) => {
                if (err) throw err;
                if (results.changedRows > 0) {
                    res.send({ success: "Answer updated successfully!" });
                }
                else {
                    res.send({ error: "There was an error." });
                }
            });
            conn.destroy();
        });
    }
    else if (req.method == 'DELETE') {
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query("DELETE FROM `answers` WHERE `answerid` = ?", [req.body.answerid], async(err, results) => {
                if (err) throw err;
                if (results.affectedRows > 0) {
                    res.send({ success: "Answer successfully deleted!"} );
                }
                else {
                    res.send({ error: "There was an error."} );
                }
            });
            conn.destroy();
        });
    }
    else {
        res.send({ error: "That method is not accepted." })
    }
}

export default handler;
