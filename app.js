const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
 
});
app.post("/", function (req, res) {
//   console.log(req.body.cityName);
     const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "fd49ee0e760a659e03d65e23ee309469";
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      query +
      "&units=" +
      unit +
      "&appid=" +
      apiKey;
    https.get(url, function (response) {
      console.log(response.statusCode);
      response.on("data", function (data) {
        var weatherData = JSON.parse(data);
        console.log(url)
        var temp = weatherData.main.temp;
        var weatherDescription = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        console.log(weatherDescription);
        res.write(
          "<h1>Todays Weather in " + query + " is " + weatherDescription + "</h1>"
        );
        res.write("<h1> and Temperature is " + temp + " Celseius</h1>");
        res.write("<img src=" + imageUrl + ">");
        res.send();
      });
    });
});
app.listen(3000, function () {
  console.log("Server Started  ");
});
