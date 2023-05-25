function getWeatherData() {
    // API configuration
    const apiKey = 'df3a35b8272d9b66d05c6c9a1c3eda1c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // API request
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {

        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;

          const container = document.getElementById('weather-container');
          container.innerHTML = `
            <p>Temperature: ${temperature} K</p>
            <p>Humidity: ${humidity}%</p>
            <p>Description: ${description}</p>
          `;
        })
        .catch(error => {
          console.log('An error occurred:', error);
        });
    }

    getWeatherData();