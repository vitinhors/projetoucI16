window.addEventListener("load", () => {
    function getWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = "49cc8c821cd2aff9af04c9f98c36eb74";
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
                
                try {
                    const response = await fetch(weatherUrl);
                    const data = await response.json();
                    const weatherInfo = document.getElementById("weather-info");
                    weatherInfo.innerHTML = `Localização: ${data.name}, Clima: ${data.weather[0].description}, Temperatura: ${data.main.temp}°C`;
                } catch (error) {
                    console.error("Erro ao buscar informações de clima:", error);
                }
            });
        } else {
            console.error("Geolocalização não suportada pelo navegador.");
        }
    }
        function updateDateTime() {
        const datetimeElement = document.getElementById("datetime");
        setInterval(() => {
            const now = new Date();
            const formattedDateTime = now.toLocaleString("pt-BR");
            datetimeElement.textContent = formattedDateTime;
        }, 1000);
    }

    getWeather();
    updateDateTime();
});
document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const backgrounds = ['bg-1', 'bg-2', 'bg-3']; 
    let currentIndex = 0;

    function changeBackground() {
        body.classList.remove(...backgrounds); 
        body.classList.add(backgrounds[currentIndex]); 
        currentIndex = (currentIndex + 1) % backgrounds.length; 
    }

    setInterval(changeBackground, 9000);
});
