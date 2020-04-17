const express = require('express');
const https = require('https');
const bodyParser = require("body-parser")
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

app.post("/weather-details", (req, res)=> {
    const query = req.body.cityName;
    const appKey = "ffbb87e3551cf6d792c70f8f5a1284ec";
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +appKey+ "&units=metric";
     https.get(url, (response)=> {
        //  console.log(response);

         response.on("data", (data)=>{
             const weather = JSON.parse(data);
                const temp = weather.main.temp;
                const lon = weather.coord.lon;
                const lat = weather.coord.lat;
                const welcome = "clouds";
                const icon = weather.weather[0].icon;
                const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                const weatherDescription = weather.weather[0].description;

                
                res.write("<p style='text-align: center; color: #d5c455; font-size: 16px; font-family: cursive'>The weather is currently " + weatherDescription +" on Longitude: "+lon+" and latitude "+lat+"</p>");
                res.write("<span style='margin: 0 auto; display: block; width: 10%'><img src= "+ imgUrl +" alt= "+ welcome +" ></span>");
                res.write("<h2 style='text-align: center;color:#42240c; font-family: Verdana;'>The temperature in " + query+ " is " + temp + " &#8451;</h2>");
                res.send();

         });

     })

 
});




//Listening to server
const port = process.env.PORT || 2000;
app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`);
});