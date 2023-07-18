var forecastData;
var cityInput = document.getElementById('cityInput');
var searchBtn = document.getElementById('searchBtn');
var searchHistory = [];

// API configuration
var apiKey = 'df3a35b8272d9b66d05c6c9a1c3eda1c';

const searchCity = () => {
  var city = cityInput.value.trim();
  var citySearchApi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  fetch(citySearchApi)
    .then(response => response.json())
    .then(data => {
      console.log('DATA -> ', data);
      var lat = data[0].lat;
      var lon = data[0].lon;

      console.log('latitude -> ', lat, '\nlongitude -> ', lon)
      getForecastWeather(lat, lon, data)

      addToSearchHistory(city, lat, lon);

      getForecastWeather(lat, lon, data);

    })

    //error message
    .catch(error => {
      if (error) throw error;
    })

}

function getForecastWeather(lat, lon, cityData) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  // API request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log('FORECAST DATA -> ', data);
      forecastData = data;
      data.list[1]
      console.log('weather', data.list[1]);
      displayCityInfo(cityData, data);

    })

    //error message
    .catch(error => {
      if (error) throw error;
    })

}

function displayCityInfo(cityData, weatherData) {

  var cityNameElement = document.getElementById('cityName');
  var countryElement = document.getElementById('country');
  var weatherCode = weatherData.list[0].weather[0].id;
  var iconElement = document.getElementById('icon');
  var forecastELement = document.getElementById('forecast');

  var cityName = cityData[0].name;
  var country = cityData[0].country;
  var forecast = weatherData.list[0].main.temp;

  cityNameElement.textContent = 'City: ' + cityName;
  countryElement.textContent = 'Country: ' + country;
  if (weatherCode >= 200 && weatherCode < 300) {
    // Thunderstorm
    iconElement.classList.add('fas', 'fa-bolt');
  } else if (weatherCode >= 300 && weatherCode < 600) {
    // Rainy
    iconElement.classList.add('fas', 'fa-cloud-showers-heavy');
  } else if (weatherCode >= 600 && weatherCode < 700) {
    // Snowy
    iconElement.classList.add('fas', 'fa-snowflake');
  } else if (weatherCode >= 700 && weatherCode < 800) {
    // Mist, Smoke, Haze, etc.
    iconElement.classList.add('fas', 'fa-smog');
  } else if (weatherCode === 800) {
    // Clear sky
    iconElement.classList.add('fas', 'fa-sun');
  } else if (weatherCode >= 801 && weatherCode < 900) {
    // Cloudy
    iconElement.classList.add('fas', 'fa-cloud');
  } else {
    // Default icon (e.g., question mark)
    iconElement.classList.add('fas', 'fa-question');
  }
  forecastELement.textContent = 'temperature: ' + forecast;
}

function addToSearchHistory(city, lat, lon) {
  var isCityInHistory = searchHistory.some(item =>toLowerCase() === city.toLowerCase());

  if (!isCityInHistory) {
    searchHistory.push({ city: city, lat: lat, lon: lon });

    updateSearchHistoryUI();
  }
}

function updateSearchHistoryUI() {
  var searchHistoryElement = document.getElementById('search-history');
  searchHistoryElement.innerHTML = '';

  searchHistory.forEach(item => {
    var cityLink = document.createElement('a');
    cityLink.href = '#';
    cityLink.textContent = item.city;
    cityLink.addEventListener('click', function () {
  
      getForecastWeather(item.lat, item.lon);
    });

    var cityItem = document.createElement('li');
    cityItem.appendChild(cityLink);

    searchHistoryElement.appendChild(cityItem);
  });
}

searchBtn.addEventListener('click', searchCity)