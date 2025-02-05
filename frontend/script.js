function getWeather() {
  const city = document.getElementById('city').value;
  if (city === "") {
    alert("Please enter a city!");
    return;
  }

  const apiKey = "eaf770d49c077936dd23b1b42e52c6c5";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading spinner
  document.getElementById('loading').style.display = 'block';
  document.getElementById('weather').style.display = 'none';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Hide loading spinner
      document.getElementById('loading').style.display = 'none';
      document.getElementById('weather').style.display = 'block';

      if (data.cod === 200) {
        const weather = data.weather[0];
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        
        // Update weather details
        document.getElementById('weather').innerHTML = `
          <p class="weather-icon"><i class="fas fa-cloud-sun"></i></p>
          <div class="weather-details">
            <p id="temperature">${temp}°C</p>
            <p id="humidity">Humidity: ${humidity}%</p>
            <p id="wind-speed">Wind Speed: ${windSpeed} m/s</p>
          </div>
        `;
      } else {
        // If city is not found, show an error
        document.getElementById('weather').innerHTML = `
          <p class="default-message">Error: ${data.message}</p>
        `;
      }
    })
    .catch(error => {
      // Handle any other errors
      document.getElementById('loading').style.display = 'none';
      document.getElementById('weather').style.display = 'block';
      document.getElementById('weather').innerHTML = `
        <p class="default-message">Error fetching weather data.</p>
      `;
      console.error("Error:", error);
    });
}
