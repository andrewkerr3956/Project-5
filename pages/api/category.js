// This route will handle multiple HTTP methods
const mysql = require('./../../lib/db');

const handler = async (req, res) => {
    if (req.method == "GET") {
        if (req.query.id) {
            console.log("GET Category at ID");
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                else {
                    conn.query("SELECT * FROM categories WHERE categoryid = ?", [req.query.id], async (err, results) => {
                        if (err) throw err;
                        if (results.length > 0) {
                            console.log(results);
                            res.send({ results })
                        }
                    });
                }
                conn.destroy();
            });
        }
        else {
            console.log("GET ALL Categories");
            mysql.pool.getConnection((err, conn) => {
                if (err) throw err;
                else {
                    conn.query("SELECT * FROM categories", async (err, results) => {
                        if (err) throw err;
                        if (results.length > 0) {
                            console.log(results);
                            res.send({ results })
                        }
                    });
                }
                conn.destroy();
            });
        }
    }
    else {
        console.log("The method does not exist yet for the route")
    }
}


export default handler;