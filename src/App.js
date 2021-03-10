import React from "react";
import './App.css';

function App() {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [weather, setWeather] = React.useState({})
  const [coordinates, setCoordinates] = React.useState({})
  const key = '7a80ce5f8e58755c9eb6b72ee83cd819';
  const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

  React.useEffect(
    () => {
      return navigator.geolocation.getCurrentPosition(handleLocation)
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

  function handleLocation(pos) {
    setCoordinates({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    })
  }

  function fetchWeather(lat = 52.7138816, lon = 5.8621951999999995, key) {
    const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${key}`;
    return fetch(url)
      .then((res) => res.json())
  }
  
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
    return images;
  }

  if (loading) return <p>Loading</p>;

  if (error) {
    return (
      <>
        <p>{error}</p>
        <button>try again</button>
      </>
    )
  }

  function weekInfo(dayNumber){ 
    return( 
      <li className='tab'>
        <b> {new Date(weather.daily[dayNumber].dt * 1000).toLocaleString("en-US", { weekday: "long" })}</b>: 
          <p style={{marginLeft: '.5rem'}}>{Math.round(weather.daily[dayNumber].temp.min)}°C 
        / {Math.round(weather.daily[dayNumber].temp.max)}°C </p>
      </li>
    )
  }

  function getBackground(day) {
    return images[weather.daily[day].weather[0].main + '.jpg'].default;
  }

  function getCurrentBackground() {
    var url = images[weather.current.weather[0].main + '.jpg'].default;
    return url;
  }
  return (

    !weather ? <p>Loading</p> :

      <div className="App">
        <div className="today" style={{ backgroundImage: `url(${getCurrentBackground()})` }}>
          <ul>
            <h1>Today</h1>
            <li>{weather.current.weather[0].description}</li>
            <li>{Math.round(weather.current.temp)}°C</li>
            <li>Feels like : {Math.round(weather.current.feels_like)}°C</li>
          </ul>
        </div>
        <div className="tom" style={{ backgroundImage: `url(${getBackground(0)})` }}>
          <ul>
            <h1>Tomorrow</h1>
            <li>{weather.daily[0].weather[0].description}</li>
            <li>{Math.round(weather.daily[0].temp.day)}°C</li>
            <li>Feels like : {Math.round(weather.daily[0].feels_like.day)}°C</li>
          </ul>
        </div>
        <div className="DaT" style={{ backgroundImage: `url(${getBackground(1)})` }}>
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
            {weekInfo(0)}
            {weekInfo(1)}
            {weekInfo(2)}
            {weekInfo(3)}
            {weekInfo(4)}
            {weekInfo(5)}
            {weekInfo(6)}
          </ul>
        </div>
        <div className="share">
          <h1>Weather at {weather.lat}, {weather.lon}</h1>
        </div>
      </div>
  );
}

export default App;
