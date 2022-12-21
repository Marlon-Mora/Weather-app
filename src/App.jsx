import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(newCoords);
  };
  const newTempCity = (cityName) => {
    const API_KEY = "b7db4adeaaff78e992c93a4e20a109c1";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    axios
      .get(URL)
      .then((res) => {
        const tempKelvin = res.data.main.temp;
        const tempCelsius = (tempKelvin - 273.15).toFixed(1);
        const tempFareheit = ((tempCelsius * 9) / 5 + 32).toFixed(1);
        const newTemperature = {
          celsius: tempCelsius,
          farenheit: tempFareheit,
        };
        setTemperature(newTemperature);
        setWeather(res.data);
      })
      .catch((err) => alert("Not found this place"));
  };
  const changeUnitTempereture = () => setIsCelsius(!isCelsius);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  useEffect(() => {
    if (coords) {
      const API_KEY = "b7db4adeaaff78e992c93a4e20a109c1";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      axios
        .get(URL)
        .then((res) => {
          const tempKelvin = res.data.main.temp;
          const tempCelsius = (tempKelvin - 273.15).toFixed(1);
          const tempFareheit = ((tempCelsius * 9) / 5 + 32).toFixed(1);
          const newTemperature = {
            celsius: tempCelsius,
            farenheit: tempFareheit,
          };
          setTemperature(newTemperature);
          setWeather(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard
          weather={weather}
          temperature={temperature}
          changeUnitTempereture={changeUnitTempereture}
          isCelsius={isCelsius}
          newTempCity={newTempCity}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
