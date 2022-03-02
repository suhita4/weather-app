const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const product = require('./api/product');
const port = 8080;

require('dotenv').config();
const apiKey = `${process.env.API_KEY}`;

app.use('/api/product', product);

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('./views/index.ejs', { weatherData: null, error: null });
});

app.post('/', function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function(err, response, body) {
        if (err) {
            res.render('./views/index.ejs', { weatherData: null, error: 'Error, please try again'});
        } else {
            let weatherData = JSON.parse(body);
            
            console.log(weatherData);

            if (weatherData.main == undefined) {
              res.render('./views/index.ejs', { weatherData: null, error: 'Error, please try again' });
            } else {
              let place = `${weatherData.name}, ${weatherData.sys.country}`,
                weatherTimezone = `${new Date(weatherData.dt * 1000)}`,
                sunset = `${new Date(weatherData.sys["sunset"] * 1000)}`,
                sunrise = `${new Date(weatherData.sys["sunrise"] * 1000)}`;

              let weatherTemp = `${weatherData.main.temp}`,
              weatherPressure = `${weatherData.main.pressure}`,
              weatherDescription = `${weatherData.weather[0].description}`,
              humidity = `${weatherData.main.humidity}`,
              clouds = `${weatherData.clouds.all}`,
              visibility = `${weatherData.visibility}`,
              main = `${weatherData.weather[0].main}`,
              timezone = `${weatherData.sys["timezone"]}`;
  
            res.render("./views/weatherPage.ejs", {
              weatherData,
              place,
              temp: weatherTemp,
              sunset,
              sunrise,
              pressure: weatherPressure,
              description: weatherDescription,
              timezone: weatherTimezone,
              humidity,
              clouds,
              visibility,
              main,
              error: null,
            });
  
            }
        }
    });
});

app.listen(process.env.PORT) || port, () => console.log("Weather app listening at http://localhost:${port}");

app.listen(3000, function() {
  console.log('Weather app listening on port 3000!');
});