const KEY = '180edee80254b89856c72de7f84e9777'

const getData = async(city) => {
    
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${KEY}`;
    overlay(true)
    let req = await fetch(base + query);
    let data = await req.json();
    overlay(false)
    
    return data;
}


const getWeather = async(city) => {
    let data = await getData(city);
    return data;
}

// ***************************************

let elWeatherForm = document.querySelector('.weather-form');
let elCard = document.querySelector('.card');

elWeatherForm.city.focus();

// UPDATE UI 
const updateUI = (weather) =>{
    console.log(weather);
    
    elCard.innerHTML = `
        <h2 class="city-name">${weather.name}, ${weather.sys.country}</h2>
        <img class="city-clouds-img" src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="">
        <p class="city-weather-main">${weather.weather[0].main}</p>
        <div class="d-flex align-items-center justify-content-around">
            <h4 class="city-wind">${weather.wind.speed} m/s</h4>
            <h4 class="city-temperature">${Math.round(weather.main.temp/10)} &degC</h4>
        </div>
    `
    
    if(elCard.classList.contains('d-none')){
        elCard.classList.remove('d-none')
    }
}

elWeatherForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let city = elWeatherForm.city.value.trim()
    getWeather(city).then((data) => updateUI(data));
    elWeatherForm.city.value = '';
})


// loader

let elOverlay = document.querySelector('.overlay')

const overlay = (state) => {
     if(state){
        elOverlay.classList.remove('d-none')
     }else{
        elOverlay.classList.add('d-none')
     }
}

