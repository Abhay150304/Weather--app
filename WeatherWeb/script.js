const searchInput = document.getElementById('searchInput');
const currentLocation = document.getElementById('currentLocation');

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            currentLocation.textContent = city;
            updateWeatherData(city);
            searchInput.value = '';
        }
    }
});

function updateWeatherData(city) {
    const temperatures = [18, 22, 25, 28, 15, 20];
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];

    const temp = temperatures[Math.floor(Math.random() * temperatures.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];

    document.querySelector('.city-name').textContent = city;
    document.querySelector('.temperature').textContent = temp + '°';
    document.querySelector('.weather-desc').textContent = condition;
}

console.log("Weather App Loaded 🌤️");
