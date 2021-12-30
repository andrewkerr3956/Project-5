// This route will handle multiple HTTP methods
let mysql = require('../../lib/db.js');

const handler = async (req, res) => {
    if (req.method == "GET") {
        console.log("Called the GET method")
        mysql.pool.getConnection((err, conn) => {
            if (err) throw err;
            else {
                conn.execute("SELECT * FROM categories WHERE categoryid = ?", [req.query.id], async (err, results) => {
                    if (err) throw err;
                    if (results.length > 0) {
                        console.log(results);
                        res.send({ results })
                    }
                });
            }
            mysql.pool.releaseConnection(conn);
        });

    }
    else {
        console.log("The method does not exist yet for the route")
    }
}


export default handler;