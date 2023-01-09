var locationButtonsEl = document.querySelector('#location-buttons');
var cityInputEl = document.querySelector('#location');
var weatherContainerEl = document.querySelector('#weather-container');
var locationSearchTerm = document.querySelector('#repo-search-term');
var userFormEl = document.querySelector('#user-form');
var APIKey = "de4c96943a87ee4923b2f54456073d16";
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();

    if (city) {
        console.log(city);
        getWeatherInfo(city);
        weatherContainerEl.textContent = '';
        cityInputEl.textContent = '';
    } else {
        alert('Please enter a city');
    }
}

//returns the city the user clicked from location buttons options
var buttonClickHandler = function (event) {
    var city = event.target.getAttribute('location');
    var state = event.target.getAttribute('state');
    var country = event.target.getAttribute('country');
    console.log(city);
    console.log(state);
    console.log(country);
    //come back to add if statement here
    if (city) {
        getWeatherInfo(city);
        weatherContainerEl.textContent = '';
    }
}

var getWeatherInfo = function (city,state,country) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + state + "," + country + "&appid=" + APIKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                console.log("latitude: "+lat);
                displayWeather(data, city);

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    });
}

var displayWeather = function (location, searchTerm) {
    if (location.length === 0) {
        weatherContainerEl.textContent = 'No data found.';
        return;
    }
    //locationSearchTerm.textContent = searchTerm;

    for (var i = 0; i < location.length; i++) {
        var lat = location[i].coord.lat;
        var lon = location[i].coord.lon;
    }

}

userFormEl.addEventListener('submit', formSubmitHandler);
locationButtonsEl.addEventListener('click',buttonClickHandler);


//testing API - delete later
var requestURL = "http://api.openweathermap.org/data/2.5/weather?q=atlanta,georgia,us&limit=5&appid=" + APIKey;

fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then (function (data) {
    console.log(data);
    console.log(data.coord.lon);
});