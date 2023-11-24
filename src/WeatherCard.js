import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Searchbar from "./Searchbar";
import UnitSwitch from './UnitSwitch';


const WeatherCard = ({ changeWeather }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    weather: null,
    weatherIcon: null,
    location: null,
    update: null,
    humidity: null,
    wind: null
  })

  const [searchfield, searchChange] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [textError, setTextError] = useState(false);
  const [unit, setUnit] = useState(null);
  const [windUnit, setWindUnit] = useState(null);
  const [check, setCheck] = useState(true);

  const onSearchChange = (event) => {
    searchChange(event.target.value);
  };

  const onChecked = () => {
    setCheck(!check)
    console.log(check)

    if (check) {
      setWindUnit("mph")
      setUnit("°F")
      setWeatherData({
        temperature: Math.round(weatherData.temperature * 9 / 5 + 32),
        weather: weatherData.weather,
        weatherIcon: weatherData.weatherIcon,
        location: weatherData.location,
        update: weatherData.update,
        humidity: weatherData.humidity,
        wind: Math.round(weatherData.wind / 1.609 * 100) / 100
      })
    } else {
      setWindUnit("km/h")
      setUnit("°C")
      setWeatherData({
        temperature: Math.round((weatherData.temperature - 32) * 5 / 9),
        weather: weatherData.weather,
        weatherIcon: weatherData.weatherIcon,
        location: weatherData.location,
        update: weatherData.update,
        humidity: weatherData.humidity,
        wind: Math.round(weatherData.wind * 1.609 * 100) / 100
      })
    }
  }


  const onButtonClicked = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=78b8994afd7f41bab8f220451232709&q=${searchfield}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const { temp_c, condition, last_updated, humidity, wind_kph } = data.current
        setWeatherData({
          temperature: temp_c,
          weather: condition.text,
          weatherIcon: condition.icon,
          location: data.location.name,
          update: last_updated,
          humidity: humidity,
          wind: wind_kph
        })
        setTimeOfDay(data.current.is_day);
        changeWeather(condition.text, timeOfDay)
        console.log(weatherData)
        setLoading(false); // Data has been fetched, set loading to false
        setTextError(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError(error);
        setLoading(false); // Error occurred, set loading to false
        setTextError(true);
      });
  };

  useEffect(() => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=78b8994afd7f41bab8f220451232709&q=Toronto`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const { temp_c, condition, last_updated, humidity, wind_kph } = data.current;

        setWeatherData({
          temperature: temp_c,
          weather: condition.text,
          weatherIcon: condition.icon,
          location: data.location.name,
          update: last_updated,
          humidity: humidity,
          wind: wind_kph,
        });
        setWindUnit("km/h");
        setUnit("°C");
        setTimeOfDay(data.current.is_day);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("weatherData has changed:", weatherData);
    if (weatherData !== null) {
      console.log(weatherData.weather, timeOfDay)
      changeWeather(weatherData.weather, timeOfDay);
    }
  }, [weatherData, timeOfDay]);

  return (
    <HeaderContainer>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <UnitSwitch Check={onChecked} Unit={unit} />
          <TextboxContainer>
            <Searchbar searchChange={onSearchChange} onButtonClicked={onButtonClicked} textError={textError} />
            <h1>{weatherData.location}</h1>
            <h2>
              {weatherData.temperature}
              {unit} - {weatherData.weather}
            </h2>
            <img src={weatherData.weatherIcon} alt="" width="110" height="110" />
            <p>Humidex: {weatherData.humidity}</p>
            <p>Wind: {weatherData.wind} {windUnit} </p>
            <p>Last updated: {weatherData.update}</p>
          </TextboxContainer>
        </div>
      )}
    </HeaderContainer>
  );
};


const HeaderContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 25px;
  min-height: 60vh;
  min-width: 50vh;
  color: white;
`;

const TextboxContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export default WeatherCard;