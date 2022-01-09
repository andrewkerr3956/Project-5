const mysql = require('./../../lib/db');
export default function handler(req, res) {
    let testthis = mysql.pool.connect((err, conn) => {
        if(err) throw err;
        testthis = conn;
    })
    res.send({host: process.env.MYSQL_HOST, sql: })    
}