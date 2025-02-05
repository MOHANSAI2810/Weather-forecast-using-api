const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve the static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// API route to fetch weather data
app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = 'eaf770d49c077936dd23b1b42e52c6c5'; // Replace with your OpenWeatherMap API key
  
  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      res.json(data);
    } else {
      res.status(404).json({ message: data.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
