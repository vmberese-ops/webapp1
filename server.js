const express = require('express');
const ejs = require('ejs');
var morgan = require('morgan');
const mongoose  = require('mongoose');
const request = require('request');
const dateformat = require("dateformat");
const Listing = require('./models/listing');

const flagLinks = {
  "Asia/Manila": "https://www.countries-ofthe-world.com/flags-normal/flag-of-Philippines.png",
  "Asia/Taipei": "https://www.countries-ofthe-world.com/flags-normal/flag-of-Taiwan.png",
  "Australia/Brisbane": "https://www.countries-ofthe-world.com/flags-normal/flag-of-Australia.png",
  "Australia/Perth": "https://www.countries-ofthe-world.com/flags-normal/flag-of-United-States-of-America.png",
  "America/Toronto": "https://www.countries-ofthe-world.com/flags-normal/flag-of-United-States-of-America.png"
}

const dNationality = {
  "Asia/Manila": "Filipino",
  "Asia/Taipei": "Taiwanese",
  "Australia/Brisbane": "Australian",
  "Australia/Perth": "Australian",
  "America/Toronto": "American"
}

const app = express();

app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.lmrp5.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Home' });
});

var location = null;

app.post('/listings', (req, res) => {
  location = req.body['location'];

  request(`http://worldtimeapi.org/api/timezone/${location}`, function (error, response, body) {
      if (error) {
        console.log(error);
      } else {
        var dateTime = JSON.parse(body)['datetime'];
        dateTime = dateTime.toString().substring(0,19);
        const date = dateformat(dateTime, "mediumDate");
        const time = dateformat(dateTime, "shortTime");
        Listing.find({ nationality: { $eq: `${dNationality[location]}` } }).sort({ createdAt: -1 })
          .then((result) => {
            res.render('listings', { title: 'Listings', flagLink: flagLinks[location], listings: result, date: date, time: time});
          })
          .catch((err) => {
            console.log(err);
          });
      }
  });
});

app.get('/listings', (req, res) => {
  request(`http://worldtimeapi.org/api/timezone/${location}`, function (error, response, body) {
      if (error) {
        console.log(error);
      } else {
        const dateTime = JSON.parse(body)['datetime'];
        const date = dateformat(dateTime, "mediumDate");
        const time = dateformat(dateTime, "shortTime");
        Listing.find({ nationality: { $eq: `${dNationality[location]}` } }).sort({ createdAt: -1 })
          .then((result) => {
            res.render('listings', { title: 'Listings', flagLink: flagLinks[location], listings: result, date: date, time: time});
          })
          .catch((err) => {
            console.log(err);
          });
      }
  });
});

app.get('/add-listing', function (req, res) {
  res.render('add-listing', { title: 'Add', flagLink: flagLinks[location], nationality: dNationality[location] });
});

app.get('/view-listing/:id', (req, res) => {
  const id = req.params.id;
  Listing.findById(id)
    .then(result => {
      res.render('view-listing', { listing: result, flagLink: flagLinks[location], title: "View",
    })
    .catch(err => {
      console.log(err);
    })
  })
})

app.post('/add-listings', (req, res) => {
  const listing = new Listing(req.body);

  listing.save()
    .then((result) => {
      res.redirect('/listings');
    })
    .catch((err) => {
      console.log(err);
    })
});






