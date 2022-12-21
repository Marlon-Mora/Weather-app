import React, { useState } from "react";

const WeatherCard = ({
  weather,
  temperature,
  changeUnitTempereture,
  isCelsius,
  newTempCity,
}) => {
  const [place, setPlace] = useState("");
  const handldeChangePlace = (e) => {
    setPlace(e.target.value);
  };
  return (
    <article className="weatherCard">
      <h2>Weather App</h2>
      <h3>{`${weather.name}, ${weather.sys.country}`}</h3>
      <section className="weatherCard-body">
        <div className="imagen">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@4x.png`}
            alt=""
          />
        </div>
        <ul>
          <li>{weather.weather[0].description}</li>
          <li>Wind Spedd: {weather.wind.speed}m/s</li>
          <li>Clouds: {weather.clouds.all} %</li>
          <li>Pressure:{weather.main.pressure} hPa</li>
        </ul>
      </section>
      <p>
        {isCelsius ? `${temperature.celsius}°C` : `${temperature.farenheit}°F`}
      </p>
      <button className="weatherCard-button" onClick={changeUnitTempereture}>
        Degrees °F/°C
      </button>
      <section className="weatherCard-footer">
        <input
          type="text"
          placeholder="Search your city"
          value={place}
          onChange={handldeChangePlace}
        />
        <button
          className="weatherCard-button"
          onClick={() => newTempCity(place)}
        >
          Search
        </button>
      </section>
    </article>
  );
};
export default WeatherCard;
