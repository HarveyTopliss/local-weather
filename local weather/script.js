'use strict';

const weatherIcon = document.querySelector('img');
const userLocation = document.querySelector('#location');
const temperature = document.querySelector('#temperature');
const tempUnit = document.querySelector('.degree-celsius');
const description = document.querySelector('#description');

//////////////////////////////////////////////////////////////////////////
const key = '82005d27a116c2880c8f0fcb866998a0';
let latitude;
let longitude;
const KELVIN = 273.15;
const weather = {};
let requestTime = false;

//stores users coordinates
const getCoords = position => {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  requestTime = true;
  requestFunction();
};

const errorHandler = function () {
  console.log('user disabled geolocation');
};

//check if the user has geolocation and accept to show their location
const geolocationAvailability = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoords, errorHandler);
  } else {
    console.log("browser doesn't support geolocation");
  }
};

geolocationAvailability();

//store data from response
const storeResponseInfo = data => {
  weather.country = data.sys.country;
  weather.city = data.name;
  weather.temperature = data.main.temp - KELVIN;
  weather.icon = data.weather[0].icon;
  weather.description = data.weather[0].description;
};

//display data from response in html
const displayData = function () {
  weatherIcon.setAttribute('src', 'icons/' + weather.icon + '.png');
  userLocation.textContent = `${weather.country}/${weather.city}`;
  temperature.textContent =
    Math.floor(weather.temperature) + tempUnit.textContent;
  description.textContent = weather.description;
};

//HTTP REQUEST//
//storing request, deciding url of request, then sending the request
// const request = new XMLHttpRequest();
// const requestFunction = function () {
//   if (requestTime === true) {
//     request.open(
//       'GET',
//       `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
//     );
//     request.send();
//   }
// };

//receiving response, collect necessary data from it
// request.addEventListener('load', function () {
//   let data = JSON.parse(this.responseText);
//   storeResponseInfo(data);
//   displayData();
// });

//PROMISE//
//send request to url, get response, collect necessary data
const requestFunction = function () {
  if (requestTime === true) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        storeResponseInfo(responseData);
        displayData();
      });
  }
};
