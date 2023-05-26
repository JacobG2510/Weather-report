function getWeatherData() {
    // API configuration
    var apiKey = 'df3a35b8272d9b66d05c6c9a1c3eda1c';
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // API request
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        var temperature = data.main.temp;
        var humidity = data.main.humidity;
        var description = data.weather[0].description;

          var container = document.getElementById('weather-container');
          container.innerHTML = `
            <p>Temperature: ${temperature} K</p>
            <p>Humidity: ${humidity}%</p>
            <p>Description: ${description}</p>
          `;
        })
        .catch(error => {
          console.log('please input city', error);
        });

    }
    
    //API Search bar
    var container = document.getElementById('weather-container');
    container.innerHTML = '';

    var cityInput = document.getElementById('city-input');
    var city = cityInput.value.trim();

    function handleFormSubmit(event) {
      event.preventDefault();

      if(city) {
        getWeatherData(city);
      } 
      
      else {
        var container = document.getElementById('weather-container');
        container.innerHTML = '';
      }
    } 

    getWeatherData();