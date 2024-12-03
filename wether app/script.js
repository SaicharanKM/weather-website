document.getElementById('searchBtn').addEventListener('click', async function () {
    const cityInput = document.getElementById('cityInput');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const city = cityInput.value.trim();

    // Validate user input
    if (!city) {
        weatherDisplay.innerHTML = `<p>Please enter a valid city name.</p>`;
        return;
    }

    const apiKey = '7da5c28ac41eb7ef2cded90b9b750929'; // Updated API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    // Show loading message
    weatherDisplay.innerHTML = `<p>Loading weather data...</p>`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            weatherDisplay.innerHTML = `
                <p><strong>${data.name}, ${data.sys.country}</strong></p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="${data.weather[0].description}" class="weather-icon">
                <p class="weather-temp">${data.main.temp}°C</p>
                <p class="weather-description">${data.weather[0].description}</p>
                <div class="weather-details">
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            `;
        } else {
            weatherDisplay.innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error fetching data! Please try again later.</p>`;
        console.error('Error:', error);
    }
});


