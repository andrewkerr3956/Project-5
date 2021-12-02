let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.get('/', (req, res) => {
    console.log("Hello World!");
})

app.listen('3001', () => {
    console.log("Now listening at port 3001")
})