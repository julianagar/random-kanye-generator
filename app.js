const express = require('express')
const request = require('request')
const https = require("https");
const bodyParser = require("body-parser")
const ejs = require("ejs");

const app = express()
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const url = "https://api.kanye.rest/"

  https.get(url, function(response) {
    response.on("data", function(data) {
      const response = JSON.parse(data)
      const quote = response.quote

      res.render("quote", {response: quote})

      res.send()

    })
  })
})
app.listen(3000, '0.0.0.0'), function() {
  console.log("im here!")
}
