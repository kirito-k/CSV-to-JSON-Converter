const path = require('path');
const fs = require('fs');
const parser = require('node-html-parser').parse;
const express = require('express');
const multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const csvToJson = require('csvtojson');

const app = express();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
})

// Mention express the static folder where all the static files exists like HTML and CSS
app.use(express.static('public'));


// Load index html as opening page of webapp.
app.get('/', (req, res) => {
    res.sendFile('index.html');
})


// Receive csv file and return modified html imbedding link to download converted json file
app.post('/fileUpload', upload.single('myFile'), (req, res) => {
    console.log('Received file:', req.file.filename);

    // Creates Json file for given CSV file
    let newFileName = processCSV(req.file.filename);
    
    // Modify html code to imbed the converted json file link in a button 
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


// Send the JSON file requested
app.get('/getFile/:fileName', (req, res) => {
    res.sendFile(path.join(__dirname + '/downloads/' + req.params.fileName));
})


// Create Json file for given CSV file using 'csvtojson' package
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