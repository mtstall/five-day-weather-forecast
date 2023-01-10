var locationButtonsEl = document.querySelector('#location-buttons');
var cityInputEl = document.querySelector('#location');
var weatherContainerEl = document.querySelector('#weather-container');
var locationSearchTerm = document.querySelector('#location-search-term');
var userFormEl = document.querySelector('#user-form');
var APIKey = "de4c96943a87ee4923b2f54456073d16";
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if (city) {
        localStorage.setItem("city",city);
        getWeatherInfo(city);
        renderCity();
        weatherContainerEl.textContent = '';
        cityInputEl.value = '';
    } else {
        alert('Please enter a city');
    }
}

var buttonClickHandler = function(event) {
    var clickedCity = event.target.getAttribute('id');
    console.log(clickedCity);
    getWeatherInfo(clickedCity);
    weatherContainerEl.textContent = '';
}

var renderCity = function() {
    var cityEl = document.createElement('button');
    var cityElText = localStorage.getItem('city');
    if (cityElText) {
        cityEl.textContent = cityElText.toUpperCase();
        cityEl.classList = 'btn';
        cityEl.setAttribute('id',cityElText);
        locationButtonsEl.appendChild(cityEl);
    }
}

renderCity();

var getWeatherInfo = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data) {
                    for (var i = 0; i < data.list.length; i+=8) {
                        var forecastEl = document.createElement('div');
                        forecastEl.classList = 'list-item flex-column align-center';

                        var titleEl = document.createElement('span');
                        var date = data['list'][i]['dt_txt']
                        var dateSplit = date.split(" ",1);
                        titleEl.textContent = dateSplit;

                        forecastEl.appendChild(titleEl);

                        var icon = data.list[i].weather[0].icon;
                        var iconEl = document.createElement('img');
                        iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                        var tempEl = document.createElement('p');
                        tempEl.textContent = "Temp: " + data['list'][i]['main']['temp'] + " °F";

                        var windEl = document.createElement('p');
                        windEl.textContent = "Wind: " + data['list'][i]['wind']['speed'] + " MPH";

                        var humidityEl = document.createElement('p');
                        humidityEl.textContent = "Humidity: " + data['list'][i]['main']['humidity'] +"%";

                        forecastEl.appendChild(iconEl);
                        forecastEl.appendChild(tempEl);
                        forecastEl.appendChild(windEl);
                        forecastEl.appendChild(humidityEl);
                        weatherContainerEl.appendChild(forecastEl);
                }
                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

locationButtonsEl.addEventListener('click', buttonClickHandler);
userFormEl.addEventListener('submit', formSubmitHandler);