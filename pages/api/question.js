// This route will deal with retrieving the questions from the database.
let mysql = require('../../lib/db');

const handler = async(req, res) => {
    const noResults = "ERROR: There were no results found from the supplied category id.";
    const queryError = "ERROR: There is either no query or insufficient information in the query supplied.";
    const methodError = "ERROR: The requested method is not valid for this route.";
    if(req.method == 'GET') {
        // Handle getting all or one question here.
        if(req.query) {
            if(req.query.categoryid) {
                mysql.pool.getConnection((err, conn) => {
                    if (err) throw err;
                    conn.query("SELECT * FROM `questions` WHERE categoryid = ?", [req.query.categoryid], async(err, results) => {
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
            else {
                // In the future, there may possibly be a system that shows all questions.
            }
        }
        else {
            res.send({queryError})
        }
    }
    else if(req.method == 'POST') {
        const success = "Question successfully inserted.";
        // Handle inserting a question here.
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            conn.query("INSERT INTO `questions` (`categoryid`, `question`, `questiondetails`, `author`, `askdate`) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())", [req.body.categoryid, req.body.question, req.body.questionDetails, req.body.author], async(err, results) => {
                if (err) throw err;
                else {
                    console.log(results);
                    res.send({success});
                }
            });
            conn.release();
        });
    }
    else if(req.method == 'PUT') {
        // Handle updating a question here.
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