const city = document.getElementById('city');
const btn = document.getElementById('btn');
const displyCity = document.getElementById('displyCity');
const tempirature = document.getElementById('tempirature');
const Humidity = document.getElementById('Humidity');
const windSpeed = document.getElementById('wind-speed');
const message = document.getElementById('msg');
const error = document.getElementById('error');
const open = document.getElementById('open');
const close = document.getElementById('close');
const asideBar = document.getElementById('asideBar');

open.addEventListener('click',()=>{
     asideBar.classList.remove('-right-80');
     asideBar.classList.add('right-0');
});
close.addEventListener('click',()=>{
     asideBar.classList.remove('right-0');
     asideBar.classList.add('-right-80');
});



const apiKey = '5be47018cefc2746eaab176920d540f5';
const url = 'https://api.openweathermap.org/data/2.5/weather?q=';


async function checkWeather(cityName) {
    const response = await fetch(url + cityName + '&appid=' + apiKey + '&units=metric');
    const data = await response.json();
    if(response.status == 404){
        error.innerHTML = 'The city name you entered is not valid.';
        msg();
    } else{ 
    console.log(data);

    displyCity.innerHTML = data.name;
    tempirature.innerHTML = Math.round(data.main.temp) + "°C";
    windSpeed.innerHTML = Math.round(data.wind.speed) + 'Km';
    Humidity.innerHTML = Math.round(data.main.humidity) + '%';
    }
}

function msg(){
     message.classList.remove('pointer-events-none','opacity-0');
       message.classList.add('opacity-100');
    setTimeout(()=>{
        message.classList.remove('opacity-100');
        message.classList.add('opacity-0','pointer-events-none');
    },2500);
}


btn.addEventListener('click',()=>{
        if(city.value == ''){
               msg();
        }else{
            checkWeather(city.value);
        }
 } );

city.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        if(city.value == ''){
               msg();
        }else{
            checkWeather(city.value);
        }
    }
});




if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker Registered');
      registration.update(); // force update if needed
    })
    .catch(err => console.error('SW registration failed:', err));
}
