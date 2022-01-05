// This route will deal with retrieving the questions from the database.
let mysql = require('../../lib/db');

const handler = async(req, res) => {
    const error = "ERROR: There was an error.";
    const noResults = "ERROR: There were no results found from the supplied category id.";
    const queryError = "ERROR: There is either no query or insufficient information in the query supplied.";
    const methodError = "ERROR: The requested method is not valid for this route.";
    if(req.method == 'GET') {
        // Handle getting all or one question here.
        if(req.query) {
            if(req.query.categoryid) {
                mysql.pool.getConnection((err, conn) => {
                    if (err) throw err;
                    conn.query("SELECT * FROM `vw_QuestionView` WHERE `categoryid` = ?", [req.query.categoryid], async(err, results) => {
                        if (err) throw err;
                        if (results.length > 0) {
                            console.log(`Retrieved questions at ${req.query.categoryid} successfully!`);
                            res.send({results});
                        }
                        else {
                            console.log("There was either no results or something went wrong.");
                            res.send({noResults});
                        }
                    });
                    conn.release();
                })
            }
            else if (req.query.qid) {
                mysql.pool.getConnection((err, conn) => {
                    if (err) throw err;
                    conn.query("SELECT * FROM `vw_QuestionView` WHERE `questionid` = ?", [req.query.qid], async(err, results) => {
                        if (err) throw err;
                        if (results.length > 0) {
                            res.send({results});
                        }
                        else {
                            res.send({error});
                        }
                    });
                    conn.release();
                })
            }
            else {
                // In the future, there may possibly be a system that shows all questions for all categories.
            }
        }
        else {
            res.send({queryError})
        }
    }
    else if(req.method == 'POST') {
        const success = "Question successfully inserted.";
        // Handle inserting a question here.
        if(req.body.question) {
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                conn.query("INSERT INTO `questions` (`authorid`, `categoryid`, `question`, `questiondetails`,  `askdate`) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())", [req.body.userid, req.body.categoryid, req.body.question, req.body.questionDetails], async(err, results) => {
                    if (err) throw err;
                    else {
                        console.log(results);
                        res.send({success});
                    }
                });
                conn.release();
            });
        }
        else {
            res.send({error: "Invalid"})
        }
    }
    else if(req.method == 'PUT') {
        // Handle updating a question here.
        if(req.body.question) {
            res.send({updateSuccess: "Question updated successfully!"})
        }
        else {
            res.send({error: "There was an error."})
        }
    }
    else if(req.method == 'DELETE') {
        // Handle deleting a question here.
        
    }
    else {
        // The method is not valid. Return that information to the front-end.
        res.send({methodError});
    }
};

export default handler;