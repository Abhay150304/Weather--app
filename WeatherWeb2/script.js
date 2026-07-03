{/* <script>
        const API_KEY = 'dd1ed210cfcd602378764a115338d1e2';
        const DEFAULT_CITY = 'Chandigarh';
        
        // Global variables for calendar
        let currentCalendarMonth = new Date().getMonth();
        let currentCalendarYear = new Date().getFullYear();
        let selectedDate = null;
        let currentForecastData = null;
        let currentCityName = DEFAULT_CITY;
        
        // Weather icon mapping
        const weatherIcons = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };

        // Other cities to display
        const otherCities = [
            { name: 'Chandigarh', country: 'IN' },
            { name: 'Mohali', country: 'IN' },
            { name: 'Delhi', country: 'IN' },
            { name: 'Jaipur', country: 'IN' }
        ];

        // Initialize app
        window.addEventListener('load', () => {
            fetchWeatherData(DEFAULT_CITY);
            loadOtherCities();
        });

        // Fetch weather data
        async function fetchWeatherData(city) {
            try {
                currentCityName = city;
                
                // Current weather
                const currentResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );
                const currentData = await currentResponse.json();

                if (currentData.cod !== 200) {
                    throw new Error(currentData.message);
                }

                // Forecast data
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
                );
                const forecastData = await forecastResponse.json();
                
                // Store forecast data globally for calendar
                currentForecastData = forecastData;

                updateUI(currentData, forecastData);
            } catch (error) {
                console.error('Error fetching weather:', error);
                alert('Failed to fetch weather data. Please try again.');
            }
        }

        // Update UI with weather data
        function updateUI(current, forecast) {
            // Update header
            document.getElementById('headerLocation').textContent = `${current.name}, ${current.sys.country}`;
            document.getElementById('headerIcon').textContent = weatherIcons[current.weather[0].icon] || '🌤️';

            // Update main forecast
            document.getElementById('mainCity').textContent = `${current.name}, ${current.sys.country}`;
            document.getElementById('mainCondition').textContent = current.weather[0].description;
            document.getElementById('mainTemp').textContent = `${Math.round(current.main.temp)}°`;
            document.getElementById('mainIcon').textContent = weatherIcons[current.weather[0].icon] || '🌤️';

            // Update highlights
            document.getElementById('feelsLike').textContent = `${Math.round(current.main.feels_like)}°`;
            document.getElementById('cloudiness').textContent = `${current.clouds.all}%`;
            document.getElementById('humidity').textContent = `${current.main.humidity}%`;
            document.getElementById('wind').textContent = `${Math.round(current.wind.speed * 3.6)}`;
            
            // Rain data (if available)
            const rainAmount = current.rain ? (current.rain['1h'] || current.rain['3h'] || 0) : 0;
            document.getElementById('rain').textContent = rainAmount > 0 ? `${rainAmount}mm` : '0%';

            // UV Index (not available in free API, using placeholder)
            document.getElementById('uv').textContent = '7';

            // Update daily forecast
            updateDailyForecast(forecast);

            // Update hourly forecast
            updateHourlyForecast(forecast);

            // Update temperature range
            const temps = forecast.list.slice(0, 8).map(item => item.main.temp);
            document.getElementById('minTemp').textContent = Math.round(Math.min(...temps));
            document.getElementById('maxTemp').textContent = Math.round(Math.max(...temps));
        }

        // Update daily forecast
        function updateDailyForecast(forecast) {
            const dailyData = [];
            const processedDates = new Set();
            const today = new Date().toDateString();
            
            forecast.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const dateString = date.toDateString();
                
                // Skip today and only process future dates
                if (dateString === today || processedDates.has(dateString)) {
                    return;
                }
                
                // Get data for each unique day
                const dayData = forecast.list.filter(forecastItem => {
                    const forecastDate = new Date(forecastItem.dt * 1000);
                    return forecastDate.toDateString() === dateString;
                });
                
                if (dayData.length > 0) {
                    // Calculate average temperature
                    const avgTemp = dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length;
                    
                    // Get the most common weather condition
                    const weatherCounts = {};
                    dayData.forEach(item => {
                        const weather = item.weather[0].main;
                        weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
                    });
                    const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => 
                        weatherCounts[a] > weatherCounts[b] ? a : b
                    );
                    
                    // Get the icon from midday forecast (around 12:00)
                    const middayForecast = dayData.find(item => {
                        const hour = new Date(item.dt * 1000).getHours();
                        return hour >= 11 && hour <= 14;
                    }) || dayData[Math.floor(dayData.length / 2)];
                    
                    dailyData.push({
                        day: date.toLocaleDateString('en-US', { weekday: 'long' }),
                        temp: Math.round(avgTemp),
                        icon: middayForecast.weather[0].icon,
                        desc: mostCommonWeather,
                        date: date
                    });
                    
                    processedDates.add(dateString);
                }
            });
            
            // Take only the next 3 days
            const next3Days = dailyData.slice(0, 3);
            
            next3Days.forEach((day, index) => {
                if (index < 3) {
                    document.getElementById(`day${index + 1}Day`).textContent = day.day;
                    document.getElementById(`day${index + 1}Temp`).textContent = `${day.temp}°`;
                    document.getElementById(`day${index + 1}Icon`).textContent = weatherIcons[day.icon] || '🌤️';
                    document.getElementById(`day${index + 1}Desc`).textContent = day.desc;
                }
            });
            
            // If we don't have 3 days, fill with placeholder
            for (let i = next3Days.length; i < 3; i++) {
                document.getElementById(`day${i + 1}Day`).textContent = 'N/A';
                document.getElementById(`day${i + 1}Temp`).textContent = '--°';
                document.getElementById(`day${i + 1}Icon`).textContent = '🌤️';
                document.getElementById(`day${i + 1}Desc`).textContent = 'No Data';
            }
        }

        // Update hourly forecast
        function updateHourlyForecast(forecast) {
            const hourlyChart = document.getElementById('hourlyChart');
            hourlyChart.innerHTML = '';

            forecast.list.slice(0, 12).forEach(item => {
                const date = new Date(item.dt * 1000);
                const hour = date.getHours();
                
                const hourItem = document.createElement('div');
                hourItem.className = 'hour-item';
                hourItem.innerHTML = `
                    <div class="hour-temp">${Math.round(item.main.temp)}°</div>
                    <div class="hour-icon">${weatherIcons[item.weather[0].icon] || '🌤️'}</div>
                    <div class="hour-temp">${hour.toString().padStart(2, '0')}:00</div>
                `;
                hourlyChart.appendChild(hourItem);
            });
        }

        // Load other cities
        async function loadOtherCities() {
            const cityList = document.getElementById('cityList');
            cityList.innerHTML = '';

            for (const city of otherCities) {
                try {
                    const response = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${API_KEY}&units=metric`
                    );
                    const data = await response.json();

                    if (data.cod === 200) {
                        const cityItem = document.createElement('div');
                        cityItem.className = 'city-item';
                        cityItem.onclick = () => fetchWeatherData(city.name);
                        
                        const condition = data.weather[0].main;
                        const high = Math.round(data.main.temp_max);
                        const low = Math.round(data.main.temp_min);
                        
                        cityItem.innerHTML = `
                            <div class="city-info">
                                <div class="city-icon">${weatherIcons[data.weather[0].icon] || '🌤️'}</div>
                                <div class="city-details">
                                    <h4>${data.name}</h4>
                                    <p>${condition}, High: ${high}° Low: ${low}°</p>
                                </div>
                            </div>
                            <div class="city-temp">${Math.round(data.main.temp)}°</div>
                        `;
                        cityList.appendChild(cityItem);
                    }
                } catch (error) {
                    console.error(`Error loading ${city.name}:`, error);
                }
            }
        }

        // Search weather
        function searchWeather() {
            const searchInput = document.getElementById('searchInput');
            const city = searchInput.value.trim();
            
            if (city) {
                fetchWeatherData(city);
                searchInput.value = '';
            }
        }

        // Enter key search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        // Load more cities - now opens search functionality
        function loadMoreCities() {
            const searchInput = document.getElementById('searchInput');
            searchInput.focus();
            searchInput.placeholder = 'Enter city name to search...';
            
            // Add a highlight animation
            searchInput.parentElement.style.border = '2px solid #5B9BD5';
            searchInput.parentElement.style.transition = 'all 0.3s';
            
            setTimeout(() => {
                searchInput.parentElement.style.border = '1px solid #e0e0e0';
            }, 2000);
        }

        // Navigation items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Calendar Functions
        function openCalendar() {
            const modal = document.getElementById('calendarModal');
            modal.classList.add('active');
            currentCalendarMonth = new Date().getMonth();
            currentCalendarYear = new Date().getFullYear();
            renderCalendar();
        }

        function closeCalendar() {
            const modal = document.getElementById('calendarModal');
            modal.classList.remove('active');
            selectedDate = null;
        }

        function changeMonth(direction) {
            currentCalendarMonth += direction;
            if (currentCalendarMonth > 11) {
                currentCalendarMonth = 0;
                currentCalendarYear++;
            } else if (currentCalendarMonth < 0) {
                currentCalendarMonth = 11;
                currentCalendarYear--;
            }
            renderCalendar();
        }

        function renderCalendar() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            
            document.getElementById('currentMonth').textContent = 
                `${monthNames[currentCalendarMonth]} ${currentCalendarYear}`;
            
            const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1).getDay();
            const daysInMonth = new Date(currentCalendarYear, currentCalendarMonth + 1, 0).getDate();
            
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const maxForecastDate = new Date();
            maxForecastDate.setDate(maxForecastDate.getDate() + 5); // 5 day forecast
            
            // Empty cells for days before month starts
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                calendarDays.appendChild(emptyDay);
            }
            
            // Days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = day;
                
                const currentDate = new Date(currentCalendarYear, currentCalendarMonth, day);
                currentDate.setHours(0, 0, 0, 0);
                
                // Check if date is today
                if (currentDate.getTime() === today.getTime()) {
                    dayElement.classList.add('today');
                }
                
                // Check if date is in the past or beyond forecast range
                if (currentDate < today || currentDate > maxForecastDate) {
                    dayElement.classList.add('disabled');
                } else {
                    // Check if we have forecast data for this date
                    if (currentForecastData && hasForecastForDate(currentDate)) {
                        dayElement.classList.add('has-forecast');
                    }
                    
                    dayElement.addEventListener('click', () => selectDate(currentDate, dayElement));
                }
                
                calendarDays.appendChild(dayElement);
            }
        }

        function hasForecastForDate(date) {
            if (!currentForecastData) return false;
            
            const dateString = date.toDateString();
            return currentForecastData.list.some(item => {
                const forecastDate = new Date(item.dt * 1000);
                return forecastDate.toDateString() === dateString;
            });
        }

        function selectDate(date, element) {
            // Remove previous selection
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Add selection to clicked date
            element.classList.add('selected');
            selectedDate = date;
            
            // Update display
            const dateString = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            document.getElementById('selectedDateDisplay').textContent = dateString;
        }

        function viewDateForecast() {
            if (!selectedDate) {
                alert('Please select a date first');
                return;
            }
            
            if (!currentForecastData) {
                alert('No forecast data available. Please search for a city first.');
                return;
            }
            
            // Find forecast data for selected date
            const selectedDateString = selectedDate.toDateString();
            const forecastsForDate = currentForecastData.list.filter(item => {
                const forecastDate = new Date(item.dt * 1000);
                return forecastDate.toDateString() === selectedDateString;
            });
            
            if (forecastsForDate.length === 0) {
                alert('No forecast available for this date. Forecast is available for the next 5 days only.');
                return;
            }
            
            // Calculate average data for the selected date
            const avgTemp = forecastsForDate.reduce((sum, item) => sum + item.main.temp, 0) / forecastsForDate.length;
            const avgFeelsLike = forecastsForDate.reduce((sum, item) => sum + item.main.feels_like, 0) / forecastsForDate.length;
            const avgHumidity = forecastsForDate.reduce((sum, item) => sum + item.main.humidity, 0) / forecastsForDate.length;
            
            // Get midday forecast for icon
            const middayForecast = forecastsForDate.find(item => {
                const hour = new Date(item.dt * 1000).getHours();
                return hour >= 11 && hour <= 14;
            }) || forecastsForDate[Math.floor(forecastsForDate.length / 2)];
            
            // Update main forecast display
            document.getElementById('mainCity').textContent = `${currentCityName} - ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
            document.getElementById('mainCondition').textContent = middayForecast.weather[0].description;
            document.getElementById('mainTemp').textContent = `${Math.round(avgTemp)}°`;
            document.getElementById('mainIcon').textContent = weatherIcons[middayForecast.weather[0].icon] || '🌤️';
            
            // Update highlights
            document.getElementById('feelsLike').textContent = `${Math.round(avgFeelsLike)}°`;
            document.getElementById('humidity').textContent = `${Math.round(avgHumidity)}%`;
            document.getElementById('cloudiness').textContent = `${middayForecast.clouds.all}%`;
            document.getElementById('wind').textContent = `${Math.round(middayForecast.wind.speed * 3.6)}`;
            
            // Update hourly forecast for that date
            updateHourlyForecastForDate(forecastsForDate);
            
            // Close calendar
            closeCalendar();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function updateHourlyForecastForDate(forecasts) {
            const hourlyChart = document.getElementById('hourlyChart');
            hourlyChart.innerHTML = '';

            forecasts.forEach(item => {
                const date = new Date(item.dt * 1000);
                const hour = date.getHours();
                
                const hourItem = document.createElement('div');
                hourItem.className = 'hour-item';
                hourItem.innerHTML = `
                    <div class="hour-temp">${Math.round(item.main.temp)}°</div>
                    <div class="hour-icon">${weatherIcons[item.weather[0].icon] || '🌤️'}</div>
                    <div class="hour-temp">${hour.toString().padStart(2, '0')}:00</div>
                `;
                hourlyChart.appendChild(hourItem);
            });
            
            // Update temperature range
            const temps = forecasts.map(item => item.main.temp);
            document.getElementById('minTemp').textContent = Math.round(Math.min(...temps));
            document.getElementById('maxTemp').textContent = Math.round(Math.max(...temps));
        }

        // Close modal when clicking outside
        document.getElementById('calendarModal').addEventListener('click', (e) => {
            if (e.target.id === 'calendarModal') {
                closeCalendar();
            }
        });
    </script> */}