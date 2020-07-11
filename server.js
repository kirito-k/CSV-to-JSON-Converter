const path = require('path');
const fs = require('fs');
const parser = require('node-html-parser').parse;
const express = require('express');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const csvToJson = require('csvtojson');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/public/index.html'));
    res.sendFile('index.html');
})


app.post('/fileUpload', upload.single('myFile'), (req, res) => {
    console.log('Received file:', req.file.filename);
    let newFileName = processCSV(req.file.filename);
    fs.readFile('public/index.html', (err, html) => {
        if (err) throw err;
        
        let root = parser(html);
        let element = root.querySelector('#infoContainer');
        let newElement = 
        "<div class='input-group-btn'> \
            <a href='/getFile/" + req.file.filename + ".json' class='btn btn-danger' download=csv-to-json> \
                Download File \
            </a> \
         </div>"
        element.appendChild(newElement);
        
        res.send(root.toString());
        console.log('JSON File ready to download.')
    })
})


app.get('/getFile/:fileName', (req, res) => {
    res.sendFile(path.join(__dirname + '/downloads/' + req.params.fileName));
})


function processCSV(fileName) {
    let filePath = 'uploads/' + fileName;

    csvToJson().fromFile(filePath)
        .then(jsonData => {
            
            // Check downloads folder doesn't exist, make one
            if (!fs.existsSync('./downloads')) {
                fs.mkdirSync('./downloads');
            }

            // Write a new json file
            let jsonFileName = 'downloads/' + fileName + '.json';
            fs.writeFile(jsonFileName, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
                if (err) throw err;
            })
            console.log('CSV-JSON processing successful.');
        })
        .catch(err => {
            throw err;
        })
}