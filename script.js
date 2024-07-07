let modeBtn = document.querySelector("#mode");
let currentMode = "light";
let body = document.querySelector("body");
let clock = document.querySelector("#clock");
let timeDisplay = document.querySelector("#time");
let detailsDisplay = document.querySelector("#details");

modeBtn.addEventListener("click", () => {
    if (currentMode === "light") {
        currentMode = "dark";
        body.classList.remove("light");
        body.classList.add("dark");
    } else {
        currentMode = "light";
        body.classList.remove("dark");
        body.classList.add("light");
    }
    updateButtonStyles();
});

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Convert hours to 12-hour format and determine AM/PM
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    // Display current day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[now.getDay()];

    // // Simulated weather data
    // const temperature = '25°C'; // Example temperature
    // const city = 'New York'; // Example city

     // Fetch weather data based on user's location
     fetchWeather()
     .then(weatherData => {
         const { temperature, city } = weatherData;
         detailsDisplay.textContent = `Today is ${day}. Weather: ${temperature} in ${city}`;
     })
     .catch(error => {
         console.error('Error fetching weather data:', error);
         detailsDisplay.textContent = `Today is ${day}. Weather data unavailable.`;
     });

    detailsDisplay.textContent = `Today is ${day}. Weather: ${temperature} in ${city}`;

    // Update styles
    updateButtonStyles();
}

function fetchWeather() {
    // Replace with your preferred weather API endpoint and API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
            const temperature = `${data.main.temp}°C`;
            const city = data.name;
            return { temperature, city };
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            return { temperature: 'N/A', city: 'Unknown' };
        });
}

setInterval(updateClock, 1000);

updateClock();

function updateButtonStyles() {
    if (currentMode === "light") {
        modeBtn.style.color = "black";
        modeBtn.style.borderColor = "black";
    } else {
        modeBtn.style.color = "white";
        modeBtn.style.borderColor = "white";
    }
}
