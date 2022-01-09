const mysql = require('./../../lib/db');

export default function handler(req, res) {
    mysql.pool.getConnection((err, conn) => {
        res.status(200).send({success: "We are in the connection!"});
        mysql.pool.releaseConnection(conn);
    });
}