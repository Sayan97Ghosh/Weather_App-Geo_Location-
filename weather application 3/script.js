let key = "df5668f719bbd762e28471b142993fb2";




const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const timezone = document.getElementById('time-zone');
const country = document.getElementById('country');
const currentWeatherItems =  document.getElementById('current-weather-items');
const weatherForcast =  document.getElementById('weather-forcast');
const currentTemp =  document.getElementById('current-temp');
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

setInterval(()=>{
    time = new Date();
    date = time.getDate();
    month = time.getMonth();
    hour = time.getHours();
    hoursIn12HrFormat = hour>=13 ? hour%12:hour;
    minutes = time.getMinutes();
    ampm = hour >=12? 'pm':'am';
    time1.innerHTML = hoursIn12HrFormat +':'+minutes+''+`<span id="am-pm">${ampm}</span>`;
    date1.innerHTML = date + " " + months[month];

 },1000) 

async function getWeatherdata(){
    let latitude;
    let longitude;
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    navigator.geolocation.getCurrentPosition((success)=>{
        console.log(success);

        let{latitude,longitude} = success.coords;
        
    });


    try{
      
            let res = await fetch (url);
            let data = await res.json();
            console.log(data);
            appendData(data);
       
    }
    catch(err){
        console.log('err:',err);
    }
   
 }
 getWeatherdata();
 function showdata(data){
    let{humidity,pressure,sunrise,sunset,wind_speed}= data.current;
 }
