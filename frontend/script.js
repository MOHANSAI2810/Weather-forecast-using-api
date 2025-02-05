function getWeather() {
  const city = document.getElementById('city').value;
  if (city === "") {
    alert("Please enter a city!");
    return;
  }
const apiKey="eaf770d49c077936dd23b1b42e52c6c5"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const weather = data.weather[0];
        const temp = data.main.temp;
        document.getElementById('weather').innerText =
          `Weather in ${data.name}: ${temp}°C, ${weather.description}`;
      } else {
        document.getElementById('weather').innerText = `Error: ${data.message}`;
      }
    })
    .catch(error => {
      document.getElementById('weather').innerText = "Error fetching weather data.";
      console.error("Error:", error);
    });
}
