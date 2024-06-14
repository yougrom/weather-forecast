#### Let's discuss the dropdown list. Let it be a Select element. The user can choose a city and we need to get the weather for it. There are two possible implementations:

```html
<select>
   <option>London</option>
   <option>Minsk</option>
   <option>Gdansk</option>
   <option>Kyiv</option>
</select>
```

That is, we get the weather by the city name. What's wrong with this? City names can be duplicated, and the openweathermap system may give incorrect weather information based solely on the name.

In the assignment's json file, there is a concept of city id. This is a more convenient option since it uniquely identifies the city. Excellent. Let's design the HTML select as follows:

```html
<select id="city">
   <option value="23232">London</option>
   <option value="33456">Minsk</option>
   <option value="87968">Gdansk</option>
   <option value="39849">Kyiv</option>
</select>
```

Where the numbers are taken from the json file - these are the ids of the specified cities.

#### Let's write an MVP (minimum viable product) application. Move to the js file and outline its structure.

The main task is to get the weather forecast. Therefore, we will put it in the getWeather function. Let's write:

```javascript
function getWeather() {

}
```

On page load, this function needs to be run. Let's add:

```javascript
function getWeather() {

}
getWeather();
```

Also, the function should run when the select is changed.

```javascript
function getWeather() {
}

getWeather();
document.querySelector('#city').onchange = getWeather;
```

The skeleton is ready.

#### The getWeather function gets the city id from the select.

```javascript
function getWeather() {
    const cityId = document.querySelector('#city').value;
}
```

Now we need to make a fetch request. Note that we have two important parameters for the request - the city id and APPID. We also have a URI - where we send the request. Let's format this nicely and logically link it. At the beginning of the js file before the function, add:

```javascript
const param = {
    "url" : "https://api.openweathermap.org/data/2.5/",
    "appid" : "your_key"
}
```

Now we are ready to format the fetch nicely.

```javascript
function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then(weather => {
            return weather.json();
        }).then(showWeather);
}
```

An aside. Why is it convenient to put url and appid in a separate object? Because the appid can change and you need the ability to replace it without digging into the code. Similarly, the url - you might switch to a new version of the API, and replacing 2.5 is more convenient at the beginning of the code.

#### What is showWeather? This is a function to display the obtained weather. Yes, we can parse it directly inside then. But then it will result in "spaghetti code" nesting, and don't forget the principle of functions - a function should do one thing but do it well. Let's write a function to display the weather forecast:

```javascript
function showWeather(data) {
    console.log(data);
}
```

Essentially, showWeather is a callback function that will receive the weather forecast from openweathermap in the data argument, and here you will parse and display it.

#### So, let's combine the skeleton of the js code to avoid confusion.

```javascript
function getWeather() {

}

function showWeather(data) {
    console.log(data);
    // here you display on the page
}

getWeather();
document.querySelector('#city').onchange = getWeather;
```

Great! Need additional functions? Create them. Add the display of weather on the page: temperature, wind information, humidity, pressure, city name.

#### How to make the task more challenging? We manually created the select in HTML. Going forward - this is not necessary. Create an object in the format

```javascript
const cities =  {
   23232 : "London",
   33456 : "Minsk",
   and so on.
}
```

Use createElement to create the select and iterate over the cities to fill the select with option elements.
```