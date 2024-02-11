/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "";
const fullApiKey = apiKey + "&units=metric";
const zip = document.getElementById("zip");
const feelings = document.querySelector("#feelings");
const dateE = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//
document.getElementById("generate").addEventListener("click", function () {
  //get weather data
  //then send the data to the server
  //then update the ui
  getWeatherData(zip.value)
    .then((weatherData) => {
      //send to server
      postData("/add", {
        date: newDate,
        temp: weatherData.list["0"].main.temp,
        content: feelings.value,
      });
    })
    .then(function () {
      updateUI();
    });
});

async function getWeatherData(zip) {
  return await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${fullApiKey}`
  ).then(function (res) {
    return res.json();
  });
}
async function postData(url, entry) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return await response.json();
}

async function updateUI() {
  const serverResponse = await fetch("/all");
  const serverData = await serverResponse.json();
  dateE.innerHTML = "Today's date: " + serverData.date;
  temp.innerHTML = "Today's temp: " + serverData.temp + " Celcius";
  content.innerHTML = "You are feeling " + serverData.content + " today!";
}
