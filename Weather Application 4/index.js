let key = "a5f77ad69932062faf0c8d0112830d42"

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key};
let data;
function getWeather(){
 let city = document.getElementById("city").value;

getData(city);


}



let container = document.getElementById('container');
let map = document.getElementById('gmap_canvas');

let t1 = document.getElementById('timezone');
let d1 = document.getElementById('date');
let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let time;
let date;
let month;
let hour;
let hoursIn12HrFormat;
let minutes;
let ampm
setInterval(()=>{
   time = new Date();
   date = time.getDate();
   month = time.getMonth();
   hour = time.getHours();
   hoursIn12HrFormat = hour>=13 ? hour%12:hour;
   minutes = time.getMinutes();
   ampm = hour >=12? 'pm':'am';
   
   t1.innerHTML = hoursIn12HrFormat + ":" + minutes +`<span style="color:coral";>${ampm}</span>`;
   t1.style.color = "coral";
   d1.innerHTML = date + ","+months[month];
   d1.style.color = "coral";


},1000)


// async await function for fetching call apis
async function getData(city){
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=hourly,minutely&units=metric&appid=${key}`;
   
    try{
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      appendData(data);
      document.querySelector("#gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
 
    }
    catch(err){
      container.innerHTML = `
             <div>
                <img id ="errorlogo"src="https://techcult.com/wp-content/uploads/2022/06/Why-no-location-found-iPhone.png" alt="">
            </div>`
     console.log('err:',err);
    }
 
 
  }
  function appendData(data){

    container.innerHTML = null;

  

    let div = document.createElement('div');
    div.setAttribute("id","details");

    let div1 = document.createElement('div');
    div1.setAttribute("id","location");


    let logo = document.createElement('img');
    logo.setAttribute("id","logo");
    
   logo.src = "clipart2347009.png";

    let max_temp = document.createElement("p");
    max_temp.innerText = `Max-Temparature: ${data.main.temp_max}°C`;

    let min_temp = document.createElement("p");
    min_temp.innerText = `Min-Temparature: ${data.main.temp_min} °C`;

    let wind = document.createElement("p");
    wind.innerText = `Wind-Speed : ${data.wind.speed}km/h`;
    let sunrise = document.createElement("p");
    // sunrise.innerText = `Sunrise: ${window.moment(sunrise).format('HH:mm a')}`;
    // let sunset = document.createElement("p");
    // sunset.innerText = `Sunset: ${window.moment(sunset).format('HH:mm a')}`;
    let humidity = document.createElement('p');
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    let temp = document.createElement('p');
    temp.innerText = `Temp: ${data.main.temp}°C`;
    let cloud = document.createElement('p');
    cloud.innerText = `Clouds: ${data.clouds.all}`;
    let weather = document.createElement('p');
    weather.innerText = ` ${data.weather[0].description}`;





   let name = document.createElement('h3');
   name.innerText = ` ${data.name},${data.sys.country}`;
   let feelslike = document.createElement('h3');
   feelslike.innerText = ` ${data.main.feels_like}°C.${data.weather[0].description}`;





 

   div.append(logo,feelslike,cloud,temp,max_temp,min_temp,humidity,wind);
   div1.append(name,weather);

   container.append(div,div1);

   map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  

  }
  async function getCurrentWeather(lat, lon) {
    
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=88dd3eb53994cc7bcb7b245e0018da8a&units=metric`)
        data = await data.json()
        appendData(data)

        document.querySelector("#gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${lat},${lon}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
    }

    catch {
        console.log("City not found");
    }
}
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  getCurrentWeather(lat, lon);
  getcurrentlocation(lat,lon);
}

window.onload = getLocation();



// this data is for 7 days for cast
function getcurrentlocation(lat,lon){

}



  