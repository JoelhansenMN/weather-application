const cityName = $('#city-name');

const apiKey = "d21fb8ec91ef8ad73e394a6f5fac325a";




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
  const requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.val()}&appid=${apiKey}&units=imperial`; //geocoding API for lat/lon
  //console.log(requestURL);

  fetch(requestURL)
  .then(response => {
    return response.json();
  })

  .then(data =>{
    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      let city = {
        id:crypto.randomUUID(),
        city:obj.name,
        long: obj.lon,
        lat:obj.lat
      };

      let citiesArray = readCitiesFromStorage()
      citiesArray.push(city);
      saveCitiesToStorage(citiesArray)
      const requestURL = `https://api.openweathermap.org/data/s.5/forecast?lat=${obj.lat}&lon=${obj.lon}&appid=${apiKey}&units=imperial`;
      return fetch(requestURL);
  }
}) 

.then(response => {
  return response.json();
}
  
  )

}


//fetch(`http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`)
//.then( response=> response.json() )
//.then(data2 =>{}

//)