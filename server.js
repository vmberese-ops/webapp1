const express = require('express');
const morgan = require('morgan')
const weather = require('weather-js')
const app = express();

app.set('view engine', 'ejs')

const weatherLinks = {
  'Sunny' : 'https://assets.msn.com/bundles/v1/weather/latest/SunnyDayV2.svg', 
  'Mostly Sunny' : 'https://assets.msn.com/bundles/v1/weather/latest/SunnyDayV2.svg', 
  'Cloudy' : 'https://assets.msn.com/bundles/v1/weather/latest/CloudyV2.svg',
  'Snow' : 'https://i.dlpng.com/static/png/6595248_preview.png',
  'Light Rain' : 'https://assets.msn.com/bundles/v1/weather/latest/LightRainV2.svg',
  'Rain' : 'https://assets.msn.com/bundles/v1/weather/latest/LightRainV2.svg',
  'Partly Sunny' : 'https://winaero.com/blog/wp-content/uploads/2019/09/MSN-Weather-icon.png',
  'Partly Cloudy' : 'https://assets.msn.com/bundles/v1/weather/latest/PartlyCloudyDayV2.svg', 
  'Clear' : 'https://assets.msn.com/bundles/v1/weather/latest/ClearNightV2.svg',
  'Mostly Cloudy' : 'https://assets.msn.com/bundles/v1/weather/latest/PartlyCloudyNightV2.svg',
  'Mostly Clear' : 'https://assets.msn.com/bundles/v1/weather/latest/ClearNightV2.svg',
  'Rain Snow' : 'https://assets.msn.com/bundles/v1/weather/latest/RainSnowV2.svg',
  'Hazy Smoke' : 'https://assets.msn.com/bundles/v1/weather/latest/HazySmokeV2.svg ',
  'Light Snow' : 'https://assets.msn.com/bundles/v1/weather/latest/LightSnowV2.svg',
  'T-Storms' : 'https://assets.msn.com/bundles/v1/weather/latest/ThunderstormsV2.svg',
  'Rain Showers' : 'https://assets.msn.com/bundles/v1/weather/latest/RainShowersDayV2.svg',
  'Rain Showers Night' : 'https://assets.msn.com/bundles/v1/weather/latest/RainShowersNightV2.svg',
  'Rain and snow showers' : 'https://assets.msn.com/bundles/v1/weather/latest/RainSnowShowersNightV2.svg',
}

app.listen(3000)

app.use((req, res, next) => {
    console.log('Request Mode');
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
});

app.use(morgan('dev'));

weather.find({search: 'Davao, PH', degreeType: 'C'}, function(err, result) {
  if(err) {
    console.log(err);

    app.get('/', function (req, res) {
      res.render('index', { title: 'Home', weather: 'None' });
    });
    
  }
  else {

    app.get('/', function (req, res) {
      res.render('index', { title: 'Home', weather: result, dateFormat, weatherLinks});
    });

  }
});

app.get('/other', function (req, res) {
  res.render('other', { title: 'Other' });
});