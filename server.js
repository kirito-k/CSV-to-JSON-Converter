const path = require('path');
const fs = require('fs');
const parser = require('node-html-parser').parse;
const express = require('express');
const port = process.env.port || 3000;
const multer = require('multer');
const { parse } = require('path');
var upload = multer({ dest: 'uploads/' });

const app = express();

// app.listen(port, () => {
//     console.log("Server is running on port 3000.")
// })

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/fileUpload', upload.single('myFile'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let newFileName = processCSV(req.file.filename)
})


function processCSV(fileName) {
    let newFileName = 'sample.json';
    return newFileName;
}

function addDownLink() {
    fs.readFile('index.html', (err, html) => {
        if (err) throw err;
        
        let root = parser(html);

        let element = root.querySelector('#infoContainer');
        let newElement = 
        "<div class='input-group-btn'> \
            <a href='downloads/sample.json' class='btn btn-danger' download> \
                Download File \
            </a> \
         </div>"
        element.appendChild(newElement);
    })
}
// addDownLink()
// datalink = 'https://github.com/CSSEGISandData/COVID-19/raw/master/who_covid_19_situation_reports/who_covid_19_sit_rep_pdfs/20200121-sitrep-1-2019-ncov.pdf'