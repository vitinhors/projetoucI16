const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74';
const city = 'Jabaquara';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
const diasDaSemana = ['Domingo', 'Segunda', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const weatherType = "weather-card"; 
const weatherIcon = document.getElementById('weather-icon');

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Erro ao obter dados do tempo:', error);
    }
}

function translateWeatherDescription(description) {
    const translations = {
        'Clear': 'Céu Limpo',
        'Clouds': 'Nublado',
        'Rain': 'Chuva',
        'Drizzle': 'Garoa',
        'Thunderstorm': 'Tempestade',
        'Snow': 'Neve',
        'Mist': 'Neblina',  
    };

    return translations[description] || description;
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('semana-container');

    for (let i = 0; i < diasDaSemana.length; i++) {
        const dayInfo = data.list.slice(i * 8, (i + 1) * 8);

        const averageProbabilityOfRain = calculateAverageProbability(dayInfo);

        const date = new Date(dayInfo[0].dt * 1000); 
        const dayOfWeek = diasDaSemana[date.getDay()];
        const temperature = dayInfo[0].main.temp;
        const weatherDescription = translateWeatherDescription(dayInfo[0].weather[0].description);
        
        const windSpeedMS = dayInfo[0].wind.speed;
        const windSpeedKMH = (windSpeedMS * 3.6).toFixed(2); 

        const humidity = dayInfo[0].main.humidity;
        const weatherIconCode = dayInfo[0].weather[0].icon; 

        weatherContainer.innerHTML += `<div class="weather-card">
            <h3>${dayOfWeek}</h3>
            <p>Temperatura: ${temperature}°C</p>
            <p>Céu: ${weatherDescription}</p>
            <p>Vento: ${windSpeedKMH} km/h</p>
            <p><i class="fas fa-tint"></i> Umidade: ${humidity}%</p>
            <p>Probabilidade de Chuva: ${averageProbabilityOfRain}%</p>
            <img src="http://openweathermap.org/img/wn/${weatherIconCode}.png" alt="Weather Icon">
        </div>`;
    }
}

function calculateAverageProbability(dayInfo) {
    const totalProbability = dayInfo.reduce((sum, interval) => sum + interval.pop, 0);
    const averageProbability = (totalProbability / dayInfo.length) * 100; // Convertendo para porcentagem
    return averageProbability.toFixed(0); // Arredondando para um número inteiro
}
window.onload = getWeather;
function getSunriseSunset() {
    const latitude = -23.6470;
    const longitude = -46.6638;
    const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74'; 

    fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`)
        .then(response => response.json())
        .then(data => {
            const sunriseTime = new Date(data.results.sunrise);
            const sunsetTime = new Date(data.results.sunset);

            document.getElementById('sunrise').innerHTML = `Nascer do Sol: ${sunriseTime.toLocaleTimeString()}`;
            document.getElementById('sunset').innerHTML = `Pôr do Sol: ${sunsetTime.toLocaleTimeString()}`;
        })
        .catch(error => console.log('Erro:', error));
}

getSunriseSunset();
