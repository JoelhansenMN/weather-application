const cityName = $('#city-name');
//const currentCity = $('#current-city');
const apiKey = "d21fb8ec91ef8ad73e394a6f5fac325a";
const searchForm = $('#search-form');



//get cities array from local storage
function readCitiesFromStorage(){
  let stringData = localStorage.getItem('cities');
  let cities =JSON.parse(stringData) || [];
  return cities;
}

//save cities array to local storage
function saveCitiesToStorage(cities){
  let savedCities = JSON.stringify(cities);
  localStorage.setItem('cities', savedCities);
}

//get's city's lat & lon, saves it into an object, and updates the cities array
function getGeoAPi(){
  const requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName.val()}&appid=${apiKey}`; //geocoding API for lat/lon
  fetch(requestURL)
  .then(response => {
    
    return response.json();
  })

  .then(data =>{
    for (let i = 0; i < data.length; i++) {
      const object = data[i];
      let city = {
        id:crypto.randomUUID(),
        city:object.name,
        long: object.lon,
        lat:object.lat,
      }
      let citiesArray = readCitiesFromStorage()
      citiesArray.push(city);
      saveCitiesToStorage(citiesArray)
      const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${object.lat}&lon=${object.lon}&appid=${apiKey}&units=imperial`;
      console.log(requestURL);
      return fetch(requestURL);     
  }
}) 
.then(response => {
  return response.json();

})

.then(function (data2){
  localStorage.setItem('weatherSearch', JSON.stringify(data2));
  todayForecast();
  fiveDayForecast();
})
.catch(function(error){console.log(error)

alert('An error has occured')})
} 

// this function gets data from API to create our daily forecast box
function todayForecast() {
  let weatherSearch = JSON.parse(localStorage.getItem('weatherSearch'));
  console.log(weatherSearch);
  let currentCity = $('#current-city');
  let todayBox = $('<div>');
  todayBox.addClass('col-9 align-items-end text-dark').attr('id', 'todayBox'); 
  let h2 = $('<h2>');
  h2.text(`${weatherSearch.city.name} ${dayjs.unix(weatherSearch.list[0].dt).format('MM/DD/YYYY')}`).appendTo(todayBox);
  let temp = $('<p>');
  temp.text(`Temperature: ${weatherSearch.list[0].main.temp} °F`).appendTo(todayBox);
  let wind = $('<p>');
  wind.text(`Wind Speed: ${weatherSearch.list[0].wind.speed} MPH`).appendTo(todayBox);
  let humidity = $('<p>');
  humidity.text(`Humidity: ${weatherSearch.list[0].main.humidity} %`).appendTo(todayBox);
  todayBox.appendTo(currentCity);
} 

function fiveDayForecast() {
  let h2 = $('<h2>');
  let mainWeek = $('.week');
  h2.text('Five Day Forecast').appendTo('five-day');
  let week = $('<p>');
  week.addClass('row align-items-start justify-content-evenly').appendTo(mainWeek);
  let weatherSearch = JSON.parse(localStorage.getItem('weatherSearch'));
  let fiveDay = [];
  let list = weatherSearch.list;
  console.log(list);
  for (let i = 1;  i < list.length; i+=8) {
   let listObj = list[i]
    //fiveDay.push(listObj);
    console.log(listObj);
  }
  




}

searchForm.on('click','.btn', function(event){event.preventDefault()
getGeoAPi();

});


$('#search-history')
