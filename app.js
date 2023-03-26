const express = require("express");

const https = require("https");
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (request, response) {
    response.sendFile(__dirname+"/index.html");
});

app.post("/",function(request,response){
    console.log(request.body.cityName);
    const query=request.body.cityName;
    const appid="f33b671548db293e385ffa776c35d051";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&mode=json&units="+unit+"";
    https.get(url, function (res) {
        // console.log(res);
        console.log(res.statusCode);
        res.on("data", function (data) {
            const wheatherData = JSON.parse(data);
            // console.log(wheatherData);
            // const object={
            //     name:"Shruti",
            //     favouriteFood:"Sandwiches"
            // }
            // console.log(JSON.stringify(object));
            const temp = wheatherData.main.temp;
            console.log(temp);
            const wheatherDescription = wheatherData.weather[0].description;
            console.log(wheatherDescription);
            const icon = wheatherData.weather[0].icon;
            const imageURL = " https://openweathermap.org/img/wn/" + icon + "@2x.png"
            response.write("<h1>The temperature in " + wheatherData.name + " is " + temp + "</h1>");
            response.write("<p>The weather is currently " + wheatherDescription + "</p>")
             response.write("<img src=" + imageURL + ">");
            response.send();
        });
    });
    // response.send("Server is up and running");

});









app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})