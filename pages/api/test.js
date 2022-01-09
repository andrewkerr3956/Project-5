export default function handler(req, res) {
    res.send({host: process.env.MYSQL_HOST})    
}