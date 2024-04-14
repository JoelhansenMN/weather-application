const cityName = $('#city-name');
const todayForecast = $('#current-city');
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
  console.log(requestURL);
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
        lat:object.lat
      };
      
      let citiesArray = readCitiesFromStorage()
      citiesArray.push(city);
      saveCitiesToStorage(citiesArray)
      const requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${object.lat}&lon=${object.lon}&appid=${apiKey}`;
      return fetch(requestURL);
      
  }
}) 

.then(response => {
  return response.json();
})

.then(function (data2){
  //console.log(data2);
  //removeDuplicates();
  localStorage.setItem('weatherSearch', JSON.stringify(data2));
  //todayWeather();
  //fiveDayWeather();
  //createSearchHistory(); //calls create search history function
})

}

function todayWeather() {
  let weatherData = JSON.parse(localStorage.getItem('weatherSearch'));
  let today = $('<div>');
  today.attr('id', 'today').addclass('text-black');
  let todayForecast = $('<div>');
  todayForecast.attr('id', 'todayForecast');
  todaySection.addClass('border-dark');
}





searchForm.on('click','.btn', function(event){event.preventDefault()
getGeoAPi();
});

$('#search-history')
//fetch(`http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`)
//.then( response=> response.json() )
//.then(data2 =>{}

//)