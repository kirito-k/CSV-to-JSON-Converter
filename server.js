const path = require('path');
const express = require('express');
const port = process.env.port || 3000;
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const app = express();

app.listen(port, () => {
    console.log("Server is running on port 3000.")
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/fileUpload', upload.single('myFile'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
})
