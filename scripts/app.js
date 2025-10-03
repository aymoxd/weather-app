const city = document.getElementById('city');
const btn = document.getElementById('btn');
const displyCity = document.getElementById('displyCity');
const tempirature = document.getElementById('tempirature');
const Humidity = document.getElementById('Humidity');
const windSpeed = document.getElementById('wind-speed');
const message = document.getElementById('msg');





const apiKey = '5be47018cefc2746eaab176920d540f5';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=';


async function checkWeather(cityName) {
    const response = await fetch(url + cityName + '&appid=' + apiKey + '&units=metric');
    const data = await response.json();

    console.log(data);
    displyCity.innerHTML = data.name;
    tempirature.innerHTML = Math.ceil(data.main.temp) + "°C";
    windSpeed.innerHTML = Math.round(data.wind.speed) + 'Km';
    Humidity.innerHTML = Math.round(data.main.humidity) + '%';
}

function msg(){
     message.classList.remove('');
       message.classList.add('bottom-5');
    setTimeout(()=>{
        message.classList.add('-bottom-10');
    },1000);
}


btn.addEventListener('click',()=>{
        if(city.value == ''){
         alert('fill the input to search for weather!!')
        }else{
            checkWeather(city.value);
        }
 } );