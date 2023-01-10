var locationButtonsEl = document.querySelector('#location-buttons');
var cityInputEl = document.querySelector('#location');
var weatherContainerEl = document.querySelector('#forecast-container');
var todayContainerEl = document.querySelector('#today-container');
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

    var apiCrrtWthrUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(apiCrrtWthrUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                if (data) {
                    //current weather
                    var currentWeatherEl = document.createElement('div');
                    currentWeatherEl.classList = 'list-item flex-column justify-space-between align-center';
                    var currentTitleEl = document.createElement('span');
                //     var today = dayjs();
                //     today.format('YYYY');
                //     console.log(today.format());
                //     var currentDateSplit = today.split("T",1);
                //     console.log(currentDateSplit);
                //    // currentTitleEl.textContent = currentDateSplit;
                var currentIcon = data.weather[0].icon;
                var currentIconEl = document.createElement('img');
                currentIconEl.src = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";

                var currentTempEl = document.createElement('p');
                currentTempEl.textContent = "Temp: " + data.main.temp + " °F";

                var currentWindEl = document.createElement('p');
                currentWindEl.textContent = "Wind: " + data.wind.speed + " MPH";

                var currentHumidityEl = document.createElement('p');
                currentHumidityEl.textContent = "Humidity: " + data.main.humidity +"%";

                currentWeatherEl.appendChild(currentIconEl);
                currentWeatherEl.appendChild(currentTempEl);
                currentWeatherEl.appendChild(currentWindEl);
                currentWeatherEl.appendChild(currentHumidityEl);
                todayContainerEl.appendChild(currentWeatherEl);
                }
            })
        }
    }
    )

    var apiFcstUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(apiFcstUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data) {
                    console.log(data);
                    //create five day forecast
                    for (var i = 7; i < data.list.length; i+=8) {
                        var forecastEl = document.createElement('div');
                        forecastEl.classList = 'list-item flex-column align-center';

                        var titleEl = document.createElement('span');
                        var date = data['list'][i]['dt_txt'];
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