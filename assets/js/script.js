var locationButtonsEl = document.querySelector('#location-buttons');
var APIKey = "de4c96943a87ee4923b2f54456073d16";
//var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var buttonClickHandler = function (event) {
    var city = event.target.getAttribute('location');
    console.log(city);

}

locationButtonsEl.addEventListener('click',buttonClickHandler);