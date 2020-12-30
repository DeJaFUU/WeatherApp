import React from "react";
import './App.css';

function fetchWeather(lat = 52.7138816, lon = 5.8621951999999995, key){
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`;
  return  fetch(url)
    .then((res) => res.json())
 }

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


  return (
    !weather ? <p>Loading</p> :
    <div className="App">
       <div style={{backgroundImage: `url(./images/${weather.current.weather[0].main}.jpg)`}} className="today">
         <ul>
           <li>{weather.current.weather[0].description}</li>
           <li>{weather.current.temp}°C</li>
           <li>Feels like : {weather.current.feels_like}°C</li>
        </ul>
      </div>
      <div className="tom">
        <ul>
           <li>{weather.daily[0].weather[0].description}</li>
           <li>{weather.daily[0].temp.day}°C</li>
           <li>Feels like : {weather.daily[0].feels_like.day}°C</li>
        </ul>
      </div>
      <div className="DaT">
      <ul>
           <li>{weather.daily[1].weather[0].description}</li>
           <li>{weather.daily[1].temp.day}°C</li>
           <li>Feels like : {weather.daily[1].feels_like.day}°C</li>
        </ul>
      </div>
      <div className="week">
        <ul>
           <li>Today {weather.current.temp}°C</li>
           <li>Tomorrow: {weather.daily[0].temp.min}°C - {weather.daily[0].temp.max}°C</li>
           <li>Tuesday: {weather.daily[1].temp.min}°C - {weather.daily[1].temp.max}°C</li>
           <li>Wednesday: {weather.daily[2].temp.min}°C - {weather.daily[2].temp.max}°C</li>
           <li>Thursday: {weather.daily[3].temp.min}°C - {weather.daily[3].temp.max}°C</li>
           <li>Friday: {weather.daily[4].temp.min}°C - {weather.daily[4].temp.max}°C</li>
           <li>Saturday: {weather.daily[5].temp.min}°C - {weather.daily[5].temp.max}°C</li>
        </ul>
      </div>
      <div className="share">Weather at {weather.lat}, {weather.lon}</div> 
    </div>
  );
}

export default App;
