document.addEventListener('DOMContentLoaded', function() {
    const weatherForm = document.getElementById('weather-form');
    const weatherResult = document.getElementById('weather-result');

    weatherForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('city').value;
        getWeather(city);
    });

    function getWeather(city) {
        const apiKey = 'YOUR_API_KEY';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherResult.innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                weatherResult.innerHTML = `<p>Error fetching data</p>`;
            });
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        const { temp, humidity } = main;
        const description = weather[0].description;

        weatherResult.innerHTML = `
            <p><strong>City:</strong> ${name}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Condition:</strong> ${description}</p>
        `;
    }
});
