# Dynamic weather app.

## What is it?

A weather app that fetches your local weather based on your location from the OpenWeatherAPI and then renders pictures and weather dynamically based on your weather conditions. 

There is a link on the right hand side with the completed project.

## How does it work?

When you open the site it will prompt you to ask your location. Or if you do not want to share your location, it will default to a preset. The following happens:

1. It will use the OpenWeatherAPI link and `fetch()` a JSON file with weather data from the used coordinates.
2. The JSON weather file will be stored in the `weather` state variable.
3. The app checks if weather exist, and if it does not return an error.
4. If succesfull, the function will fetch images based on the weather type, and use those as background for the div. And return this with the weather data.
5. `new Date()` is called to fetch the days for the weekly weather overview.

## How do I use it when cloning?

For preview purposes I have added a key in the state, this is bad practice. If you want to use your own you should get a key from OpenWeatherAPI, and add this to a `.env` variable that points towards the `.env` variable in the `FetchWeather` function.

Pictures inside the src/images can be switched out, do not forgot to keep the current naming, it is required for dynamical fetching.

## FAQ.

### Why is the left-bottom box empty?

It will be used to display a weather graph when I have a better understanding of D3.js.

### Why is can't the image names be changed?

To make the application dynamic, it requires a parameter from the API call to mirror the current weather condition. Those parameters are stored inside the `weather.current.weather[0]` object, and `[weather.daily[day].weather[0]` objects. 

For more information about the weather types visit the OpenWeatherAPI docs : https://openweathermap.org/weather-conditions

### Those hooks are fancy, where did you learn to use that?

TylerMcGinnis his courses, yes a shameless plug!
