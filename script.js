// Header
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const historyContainer = document.querySelector("#history-container");

// Containers Principais
const weatherContainer = document.querySelector("#weather-container");
const errorMessageContainer = document.querySelector("#error-message");

// Dados do Clima Atual
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weather-icon");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

// Previsão
const forecastGrid = document.querySelector("#forecast-grid");

// --- CHAVE DA API ---
const apiKey = "SUA_CHAVE_DE_API_AQUI"; // Sua chave


const getCurrentWeather = async (cityOrLat, lon = null) => {
    let apiURL;

    if (lon) {
        apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${cityOrLat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;
    } else {
        apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityOrLat}&units=metric&appid=${apiKey}&lang=pt_br`;
    }

    const res = await fetch(apiURL);
    if (!res.ok) throw new Error("Erro ao buscar clima atual.");
    const data = await res.json();
    return data;
};

const getForecast = async (cityOrLat, lon = null) => {
    let apiURL;

    if (lon) {
        apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityOrLat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;
    } else {
        apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityOrLat}&units=metric&appid=${apiKey}&lang=pt_br`;
    }

    const res = await fetch(apiURL);
    if (!res.ok) throw new Error("Erro ao buscar previsão.");
    const data = await res.json();

    // Filtro para pegar apenas as previsões das 12:00:00 de cada dia
    const dailyForecasts = data.list.filter(item => 
        item.dt_txt.includes("12:00:00")
    );
    
    return dailyForecasts;
};

const displayWeatherData = (currentData, forecastData) => {
    errorMessageContainer.classList.add("hide");
    weatherContainer.classList.remove("hide");

    cityName.innerText = currentData.name;
    temperature.innerText = `${parseInt(currentData.main.temp)}°C`;
    description.innerText = currentData.weather[0].description;
    humidity.innerText = `${currentData.main.humidity}%`;
    wind.innerText = `${currentData.wind.speed} km/h`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`);

    updateBackground(currentData.weather[0].icon);

    forecastGrid.innerHTML = "";

    forecastData.forEach(day => {
        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <p class="forecast-day">${formatDay(day.dt)}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Ícone">
            <p>${parseInt(day.main.temp)}°C</p>
        `;
        
        forecastGrid.appendChild(card);
    });
};


const updateBackground = (iconCode) => {
    const body = document.body;
    body.className = ""; 

    if (iconCode.endsWith('n')) {
        body.classList.add("night"); // Se terminar com 'n', é noite
    } else if (["01d", "02d"].includes(iconCode)) {
        body.classList.add("sunny"); // Sol
    } else if (["03d", "04d"].includes(iconCode)) {
        body.classList.add("cloudy"); // Nublado
    } else if (["09d", "10d", "11d"].includes(iconCode)) {
        body.classList.add("rainy"); // Chuva
    } else if (iconCode === "13d") {
        body.classList.add("snowy"); // Neve
    } else {
        body.classList.add("default"); // Padrão
    }
};

const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide");
    weatherContainer.classList.add("hide");
};

const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    
    return date.toLocaleDateString("pt-BR", { weekday: "short" });
};

const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    historyContainer.innerHTML = "";
    history.forEach(city => {
        const btn = document.createElement("button");
        btn.innerText = city;
        btn.addEventListener("click", () => {
            cityInput.value = city;
            handleSearch();
        });
        historyContainer.appendChild(btn);
    });
};

const saveSearch = (city) => {
    let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];
    if (!history.includes(city)) {
        history.unshift(city);
    }
    if (history.length > 5) {
        history.pop();
    }
    localStorage.setItem("weatherHistory", JSON.stringify(history));
    loadHistory();
};


const handleSearch = async () => {
    const city = cityInput.value;
    if (!city) return; 

    try {
        const [currentData, forecastData] = await Promise.all([
            getCurrentWeather(city),
            getForecast(city)
        ]);

        displayWeatherData(currentData, forecastData);
        saveSearch(currentData.name);

    } catch (error) {
        console.error("Erro ao buscar dados: ", error);
        showErrorMessage();
    }
};

searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

window.addEventListener("load", () => {
    loadHistory(); 

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                try {
                    const [currentData, forecastData] = await Promise.all([
                        getCurrentWeather(lat, lon),
                        getForecast(lat, lon)
                    ]);
                    
                    displayWeatherData(currentData, forecastData);
                    saveSearch(currentData.name);

                } catch (error) {
                    console.error("Erro na geolocalização: ", error);
                }
            },
            (error) => {
                console.warn("Usuário negou geolocalização.");
            }
        );
    }
});