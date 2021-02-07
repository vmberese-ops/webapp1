const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    let urll = './views/';

    if(req.url == '/' || req.url == '/home') {
        urll += 'index.html';
        res.statusCode = 200;
    }
    else if(req.url == '/contact') {
        urll += 'contact-us.html';
        res.statusCode = 200;
    }
    else if(req.url == '/about') {
        urll += 'about.html';
        res.statusCode = 200;
    } else {
        urll += '404.html';
        res.statusCode = 404;
    }

    res.setHeader('Content-Type', 'text/html');
    fs.readFile(urll, (err, data) =>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening');
});