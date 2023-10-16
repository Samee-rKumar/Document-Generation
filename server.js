
const fetchSingularFieldsData = require('./fetchSingularFieldsData')

var http = require('http');

const fs = require('fs')

const indexpage = fs.readFileSync('index.html');

let templateCode = '2'

http.createServer(function (req, res) {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(indexpage);
        res.end();
    }
    if (req.url == '/generate') {
        con.query(fetchSingularFieldsData(templateCode), (err, result) => {
            if (err) throw err
            console.log(result[0])

        })


    }
}).listen(8080);


// const document = fs.readFileSync(`./html_files/${templateCode}.html`)
// let html = document.toString()
// for (var i = 0; i < Object.keys(result[0]).length; i++) {
//     if (html.indexOf(Object.keys(result[0])[i] != -1)) {
//         html = html.replace('##' + Object.keys(result[0])[i] + '##', Object.values(result[0])[i])
//     }
// }
// res.writeHead(200, { 'Content-Type': 'text/html' });
// res.write(html)
// res.end();