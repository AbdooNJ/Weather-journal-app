// Setup empty JS object to act as endpoint for all routes
projectData = {};
//port variable
const port = 8000;
// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, function () {
  console.log("Hurry! this server is runnin on http://localhost:" + port);
});

// get the data from //localhost:$port/all
// first parameter is url
// second is a function that get data from projectData
// return data to the client
app.get("/all", function (req, res) {
  res.send(projectData);
});

//post the data by //localhost:$port/add
//first parameter is url
//second is a function that send data
// from frontEnd to backEnd
app.post("/add", function (req, res) {
  const data = req.body;
  projectData.date = data.date;
  projectData.temp = data.temp;
  projectData.content = data.content;
  res.send(projectData);
});
