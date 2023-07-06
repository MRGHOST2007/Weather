const themeSwitch = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const dayNight = document.getElementById("icon-day-night");
const API_KEY = "3045dd712ffe6e702e3245525ac7fa38";
const results = document.querySelector(".results");
var city = document.getElementById("city");
var getInfo = document.getElementById("getInfo");
const searchBox = document.querySelector(".search-box");
const update = document.getElementById("update");

async function getWeather() {

        var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&lang=en`);
        var result = await ( response.json() );
        
        if (response.status == 200){
            setInfo(result);
        } else {
            alert("Enter a city name please");
        }

}

function setInfo(data) {

        const card = document.createElement("div");
        var cityName = document.createElement("h4");
        var skyDescription = document.createElement("span");
        var temp = document.createElement("span");
        var windSpeed = document.createElement("span");

        card.setAttribute("id", "card");
        results.setAttribute("style", "display : flex;");
        cityName.setAttribute("id", `city-${cityName}`);
        skyDescription.classList.add("sky-description");
        temp.classList.add("temp");
        windSpeed.classList.add("wind-speed");

        card.appendChild(cityName);
        card.appendChild(skyDescription);
        card.appendChild(temp);
        card.appendChild(windSpeed);
        results.appendChild(card);

        var description = data["weather"][0]["description"];
        var temperture = data["main"]["temp"];
        var wind = data["wind"]["speed"];

        cityName.innerHTML = city.value;
        skyDescription.innerHTML = "Sky Description : " + description;
        temp.innerHTML = "Temperture : " + convertToCelsius(temperture) + "°C";
        windSpeed.innerHTML = "Wind Speed : " + wind + "Km/h";

        city.value = "";

}

function convertToCelsius(data) {
    return Math.round(data - 273);
}

getInfo.addEventListener("click", getWeather);
city.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        getInfo.click();
    }
});