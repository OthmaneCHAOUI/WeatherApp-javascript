const apiKey = CONFIG.apiKey;
const apiUrl = CONFIG.apiUrl;

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (response.status == 404) {
        alert("City not found");
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        checkWeather(searchInput.value);
    }
})

function updateBackground(weather) {
    const body = document.querySelector("body");
    body.className = "weather-bg"; // Reset to base class
    if (weather.includes("cloud")) body.classList.add("clouds");
    else if (weather.includes("rain")) body.classList.add("rain");
    else if (weather.includes("snow")) body.classList.add("snow");
    else if (weather.includes("mist") || weather.includes("fog")) body.classList.add("mist");
    else body.classList.add("clear");
}

updateBackground(data.weather[0].main.toLowerCase());