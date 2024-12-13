let search = document.querySelector(".search");

let today = document.querySelector(".today");
let dayNum = document.querySelector(".dayNum");
let todayMonth = document.querySelector(".todayMonth");
let firstDayLocation = document.querySelector(".firstDayLocation");
let firstDayDeg = document.querySelector(".firstDayDeg");
let firstDayImg = document.querySelector(".firstDayImg");
let firstDayDesc = document.querySelector(".firstDayDesc");
let firstDayHumidity = document.querySelector(".firstDayHumidity");
let firstDayWind = document.querySelector(".firstDayWind");
let firstDayWindDir = document.querySelector(".firstDayWindDir");

let nextDay = document.querySelectorAll(".nextDay");
let nextDaysImg = document.querySelectorAll(".nextDaysImg");
let nextDaysMaxDeg = document.querySelectorAll(".nextDaysMaxDeg");
let nextDaysMinDeg = document.querySelectorAll(".nextDaysMinDeg");
let nextDaysDesc= document.querySelectorAll(".nextDaysDesc");


//^ app variables



// ^ functions

async function getData(city) {
    let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c606d5a3fea143b1b5d144738241410&q=${city}&days=3`);
    let weatherData = await weatherResponse.json();
    return weatherData;
}


function displayTodayWeather(weather) {

    let date = new Date();
    today.innerHTML= date.toLocaleString("en-us", {weekday: "long"});
    dayNum.innerHTML= date.getDate();
    todayMonth.innerHTML= date.toLocaleString("en-us", {month: "long"});
    firstDayLocation.innerHTML= weather.location.name;
    firstDayDeg.innerHTML= weather.current.temp_c;
    firstDayImg.setAttribute("src", "https:"+ weather.current.condition.icon);
    firstDayDesc.innerHTML= weather.current.condition.text;
    firstDayDesc.innerHTML= weather.current.condition.text;
    firstDayDesc.innerHTML= weather.current.condition.text;
    firstDayDesc.innerHTML= weather.current.condition.text;
    firstDayHumidity.innerHTML= weather.current.humidity;
    firstDayWind.innerHTML= weather.current.wind_kph;
    firstDayWindDir.innerHTML= weather.current.wind_dir;
}

function displayNextDays(weather) {
    let nextDaysWeather= weather.forecast.forecastday
    for(i=0; i<2; i++) {
        let nextDate = new Date(nextDaysWeather[i+1].date);
        nextDay[i].innerHTML= nextDate.toLocaleString("en-us", {weekday: "long"});
        nextDaysImg[i].setAttribute("src", "https:"+ nextDaysWeather[i+1].day.condition.icon);
        nextDaysMaxDeg[i].innerHTML= nextDaysWeather[i+1].day.maxtemp_c;
        nextDaysMinDeg[i].innerHTML= nextDaysWeather[i+1].day.mintemp_c;
        nextDaysDesc[i].innerHTML= nextDaysWeather[i+1].day.condition.text;
    }
}


async function displayWeather(city="cairo") {
    let weather = await getData(city);
    displayTodayWeather(weather);
    displayNextDays(weather);
}
displayWeather();

search.addEventListener("input", function() {
    displayWeather(search.value);
})