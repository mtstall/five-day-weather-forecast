var locationButtonsEl = document.querySelector("#location-buttons");
var cityInputEl = document.querySelector("#location");
var weatherContainerEl = document.querySelector("#forecast-container");
var todayContainerEl = document.querySelector("#today-container");
var locationSearchTerm = document.querySelector("#location-search-term");
var userFormEl = document.querySelector("#user-form");
var forecastTitleEl = document.querySelector("#forecast-title");
var APIKey = "de4c96943a87ee4923b2f54456073d16";
var index = 0;

//function to handle form submit
var formSubmitHandler = function (event) {
  event.preventDefault();
  //grab value of user input
  var city = cityInputEl.value.trim();

  //validation if statement
  if (city) {
    localStorage.setItem("city" + index, city);
    getWeatherInfo(city);
    renderCity(city);
    index++;
    weatherContainerEl.textContent = "";
    todayContainerEl.textContent = "";
    forecastTitleEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

//function to handle button clicks on persisting data
var buttonClickHandler = function (event) {
  //grab id of clicked city/button
  var clickedCity = event.target.getAttribute("id");
  //find weather info of the clicked city
  getWeatherInfo(clickedCity);
  weatherContainerEl.textContent = "";
  todayContainerEl.textContent = "";
  forecastTitleEl.textContent = "";
};

//function to create button elements that persist on the page for cities user has searched
var renderCity = function (city) {
  //max number of cities to render on new page load
  maxStoredCities = 9;
  //if city is undefined (i.e. on a new page load), run this code
  if (!city) {
    for (var i = 0; i < maxStoredCities; i++) {
      var cityElText = localStorage.getItem("city" + i);
      //if there aren't 10 saved cities in local storage, break out of the function
      if (!cityElText) {
        return;
        //otherwise, pull all saved cities from local storage and render them to the page
      } else {
        var cityEl = document.createElement("button");
        cityEl.textContent = cityElText.toUpperCase();
        cityEl.classList = "btn";
        cityEl.setAttribute("id", cityElText);
        locationButtonsEl.appendChild(cityEl);
      }
    }
  }
  //if city is defined (i.e. user entered in a city name), run this code
  else if (city) {
    var cityEl = document.createElement("button");
    var cityElText = localStorage.getItem("city" + index);
    cityEl.textContent = cityElText.toUpperCase();
    cityEl.classList = "btn";
    cityEl.setAttribute("id", cityElText);
    locationButtonsEl.appendChild(cityEl);
  }
};

renderCity();

var getWeatherInfo = function (city) {
  //current weather api
  var apiCrrtWthrUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  fetch(apiCrrtWthrUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data) {
          //creating elements for current weather info
          var currentWeatherEl = document.createElement("div");
          currentWeatherEl.classList =
            "list-item flex-column justify-space-between align-center";
          var currentTitleEl = document.createElement("span");
          // displays current date
          var h2CurrentDateEl = document.createElement("h2");
          const $day = dayjs().format("MM" + "/" + "DD" + "/" + "YYYY");
          var nameCity = data.name;
          var nameAndDate = nameCity + " (" + $day + ")";
          $(h2CurrentDateEl).append(nameAndDate);

          var currentIcon = data.weather[0].icon;
          var currentIconEl = document.createElement("img");
          currentIconEl.src =
            "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";

          var currentTempEl = document.createElement("p");
          currentTempEl.textContent = "Temp: " + data.main.temp + " ??F";

          var currentWindEl = document.createElement("p");
          currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";

          var currentHumidityEl = document.createElement("p");
          currentHumidityEl.textContent =
            "Humidity: " + data.main.humidity + "%";

          currentWeatherEl.appendChild(h2CurrentDateEl);
          currentWeatherEl.appendChild(currentIconEl);
          currentWeatherEl.appendChild(currentTempEl);
          currentWeatherEl.appendChild(currentWindEl);
          currentWeatherEl.appendChild(currentHumidityEl);
          todayContainerEl.appendChild(currentWeatherEl);
        }
      });
    }
  });

  //five day forecast api
  var apiFcstUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  fetch(apiFcstUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        if (data) {
          //creating elements for forecast data
          var forecastTitle = document.createElement("h2");
          forecastTitle.textContent = "5-day Forecast";
          forecastTitleEl.appendChild(forecastTitle);
          //create five day forecast
          for (var i = 7; i < data.list.length; i += 8) {
            var forecastEl = document.createElement("div");
            forecastEl.classList = "list-item flex-column align-center";

            var titleEl = document.createElement("span");
            var date = data["list"][i]["dt_txt"];
            var dateSplitSpace = date.split(" ", 1);
            var dateSplitHyphen = dateSplitSpace[0].split("-");
            var dateFormat =
              dateSplitHyphen[1] +
              "/" +
              dateSplitHyphen[2] +
              "/" +
              dateSplitHyphen[0];
            titleEl.textContent = dateFormat;
            forecastEl.appendChild(titleEl);

            var icon = data.list[i].weather[0].icon;
            var iconEl = document.createElement("img");
            iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            var tempEl = document.createElement("p");
            tempEl.textContent =
              "Temp: " + data["list"][i]["main"]["temp"] + " ??F";

            var windEl = document.createElement("p");
            windEl.textContent =
              "Wind: " + data["list"][i]["wind"]["speed"] + " MPH";

            var humidityEl = document.createElement("p");
            humidityEl.textContent =
              "Humidity: " + data["list"][i]["main"]["humidity"] + "%";

            forecastEl.appendChild(iconEl);
            forecastEl.appendChild(tempEl);
            forecastEl.appendChild(windEl);
            forecastEl.appendChild(humidityEl);
            weatherContainerEl.appendChild(forecastEl);
          }
        }
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//event listeners
locationButtonsEl.addEventListener("click", buttonClickHandler);
userFormEl.addEventListener("submit", formSubmitHandler);
