const express = require('express');
const morgan = require('morgan')
const { students } = require('./students')
const app = express();

app.set('view engine', 'ejs')

app.listen(3000)

app.use((req, res, next) => {
    console.log('Request Mode');
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
});

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.render('index', {studentData: students});
  //res.sendFile('./views/index.html', {root: __dirname})
});

app.get('/about', function (req, res) {
  res.render('about');
  //res.sendFile('./views/about.html', {root: __dirname})
});

app.get('/contact', function (req, res) {
  res.render('contactus');
  //res.sendFile('./views/contactus.html', {root: __dirname})
});

app.get('/aboutus', function (req, res) {
  res.redirect('/about')
});

app.use((req, res) => {
    res.render('404')
});