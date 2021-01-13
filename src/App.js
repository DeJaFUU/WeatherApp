import React from "react";
import './App.css';

function fetchWeather(lat = 52.7138816, lon = 5.8621951999999995, key){
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`;
  return  fetch(url)
    .then((res) => res.json())
 }

 function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

function App() {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [weather, setWeather] = React.useState({})
  const [coordinates, setCoordinates] = React.useState({})
  const key = '7a80ce5f8e58755c9eb6b72ee83cd819';

  React.useEffect(
    () => {
      navigator.geolocation.getCurrentPosition(handleLocation)
    }, []);

  React.useEffect(() => {
    fetchWeather(coordinates.latitude, coordinates.longitude, key)
      .then((fetchedWeather) => {
        console.log(coordinates.latitude, coordinates.longitude)
        setWeather(fetchedWeather);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        console.warn(e.message);
        setError('Error fetching weather. Try again.');
        setLoading(false);
      })
  }, [coordinates]);

  function handleLocation(pos){
    setCoordinates({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
  }

  if(loading) return <p>Loading</p>;

  if(error){
    return (
      <>
      <p>{error}</p>
      <button>try again</button>
      </>
    )
  }

  console.log(weather.daily);

  return (
    !weather ? <p>Loading</p> :
    <div className="App">
      <div className="today">
         <ul>
           <h1>Today</h1>
           <li>{weather.current.weather[0].description}</li>
           <li>{Math.round(weather.current.temp)}°C</li>
           <li>Feels like : {Math.round(weather.current.feels_like)}°C</li>
        </ul>
      </div>
      <div className="tom">
        <ul>
           <h1>Tomorrow</h1>
           <li>{weather.daily[0].weather[0].description}</li>
           <li>{Math.round(weather.daily[0].temp.day)}°C</li>
           <li>Feels like : {Math.round(weather.daily[0].feels_like.day)}°C</li>
        </ul>
      </div>
      <div className="DaT">
        <ul>
           <h1>Day after Tomorrow</h1>
           <li>{weather.daily[1].weather[0].description}</li>
           <li>{Math.round(weather.daily[1].temp.day)}°C</li>
           <li>Feels like : {Math.round(weather.daily[1].feels_like.day)}°C</li>
        </ul>
      </div>
      <div className="week">
        <ul>  
          <h1>This week!</h1>
           <li>{new Date(weather.daily[0].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[0].temp.min)}°C and {Math.round(weather.daily[0].temp.max)}°C</li>
           <li>{new Date(weather.daily[1].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[1].temp.min)}°C and  {Math.round(weather.daily[1].temp.max)}°C</li>
           <li>{new Date(weather.daily[2].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[2].temp.min)}°C and  {Math.round(weather.daily[2].temp.max)}°C</li>
           <li>{new Date(weather.daily[3].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[3].temp.min)}°C and  {Math.round(weather.daily[3].temp.max)}°C</li>
           <li>{new Date(weather.daily[4].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[4].temp.min)}°C and  {Math.round(weather.daily[4].temp.max)}°C</li>
           <li>{new Date(weather.daily[5].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[5].temp.min)}°C and  {Math.round(weather.daily[5].temp.max)}°C</li>
           <li>{new Date(weather.daily[6].dt *1000).toLocaleString("en-US", {weekday: "long"})}: Between {Math.round(weather.daily[5].temp.min)}°C and  {Math.round(weather.daily[6].temp.max)}°C</li>
        </ul>
      </div>
      <div className="share">
        <h1>Weather at {weather.lat}, {weather.lon}</h1>
        </div> 
    </div>
  );
}

export default App;
