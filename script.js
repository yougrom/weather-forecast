// Add DOM Element
const weatherRow = document.createElement('section');
weatherRow.className = 'weather-row';
document.body.appendChild(weatherRow);

const weatherCard = document.createElement('div');
weatherCard.className = 'weather-card';
weatherRow.appendChild(weatherCard);

const select = document.createElement('select');
select.id = 'city';
weatherCard.appendChild(select);

const divName = document.createElement('div');
divName.className = 'city-name';
weatherCard.appendChild(divName);

const divTemperature = document.createElement('div');
divTemperature.className = 'city-temperature';
weatherCard.appendChild(divTemperature);

const divIcon = document.createElement('div');
divIcon.className = 'city-icon';
weatherCard.appendChild(divIcon);

const divDescription = document.createElement('div');
divDescription.className = 'city-description';
weatherCard.appendChild(divDescription);

const divWind = document.createElement('div');
divWind.className = 'city-wind';
weatherCard.appendChild(divWind);

const divPressure = document.createElement('div');
divPressure.className = 'city-pressure';
weatherCard.appendChild(divPressure);

// List of Cities
let options = [
  { value: 2643743, text: 'London' },
  { value: 2950158, text: 'Berlin' },
  { value: 3128760, text: 'Barcelona' },
  { value: 703448, text: 'Kyiv' },
];

for (let i = 0; i < options.length; i++) {
  const option = document.createElement('option');
  option.value = options[i].value;
  option.textContent = options[i].text;
  select.appendChild(option);
}

/** Card */
const param = {
  url: 'https://api.openweathermap.org/data/2.5/',
  appid: 'a316cc86e8b0b6b7394f561f97e066aa',
};

function getWeather() {
  const cityId = document.querySelector('#city').value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

// функция показа полученной погоды
function showWeather(data) {
  console.log(data);
  document.querySelector('.city-name').innerHTML = data.name;
  document.querySelector('.city-temperature').innerHTML =
    Math.round(data.main.temp) + '&deg;';
  document.querySelector(
    '.city-icon'
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
  document.querySelector('.city-description').innerHTML =
    data.weather[0].description;
  document.querySelector('.city-wind').innerHTML =
    data.wind.deg + ' / ' + data.wind.speed;
  document.querySelector('.city-pressure').textContent =
    data.main.pressure + ' mbar';
}

getWeather();
document.querySelector('#city').onchange = getWeather;
