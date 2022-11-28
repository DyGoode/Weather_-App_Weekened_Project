//setting the value of myKey
const myKey = "58fecf3fe581080d1a2b9ea58340fa90";


const form = document.querySelector('#testDataForm')
console.log(form)

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let query_city = document.querySelector('#city-name').value
    console.log(query_city)
    loadCityData(query_city)
})


// function to grab data - by city
const getCityData = async (name) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${myKey}`)
    console.log(response.data)
    return response.data
}

// variable that house my list of data being pulled from OW API
const weatherElements = {
    weather_lists: '.weather-list'
}

// creation of weather attributes list in html
const createList = (id, name, temp_max, temp_min, description, humidity) => {
    const html = `<a href = "#" class="list-group-item list-group-item-action list-group-item-light" id="${id}"> ${name} </a>`
    const html2 = `<div class="card" style="width: 80%; id="${id}">
    <div class="card-header">
      ${name}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> High: ${temp_max}</li>
      <li class="list-group-item"> Low: ${temp_min}</li>
      <li class="list-group-item"> Forecast: ${description}</li>
      <li class="list-group-item"> Humidity: ${humidity}</li>
    </ul>
    </div>
    <br>`
    document.querySelector(weatherElements.weather_lists).insertAdjacentHTML('beforeend', html2)
}

//Function to load data and display html - for city
const loadCityData = async (query_city) => {
    const weather = await getCityData(query_city)
    console.log(weather)
    let max_temp = ((weather.main.temp_max - 273.15) * (9/5) + 32).toFixed(2);
    let min_temp = ((weather.main.temp_min - 273.15) * (9/5) + 32).toFixed(2);
    createList(weather.id, weather.name, max_temp, min_temp, weather.weather[0].description, weather.main.humidity)
}

// function to clear data
const clearData = () => {
    document.querySelector(weatherElements.weather_lists).innerHTML = '';
}
