import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import WeatherCard from "./WeatherCard";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [nextWeather, setNextWeather] = useState(null);
  const [time, setTime] = useState(null);
  const [playAnimation, setPlayAnimation] = useState(false);

  const changeWeather = (newWeather, timeOfDay) => {
    console.log("Received new weather and timeOfDay:", newWeather, timeOfDay);
    setTime(timeOfDay);

    if (timeOfDay <= 0) {
      setNextWeather("night");
    } else if (newWeather.toLowerCase().includes("sun")) {
      setNextWeather("sunny");
    } else if (newWeather.toLowerCase().includes("rain")) {
      setNextWeather("rainy");
    } else if (newWeather.toLowerCase().includes("cloud") || newWeather.toLowerCase().includes("overcast")) {
      setNextWeather("cloudy");
    } else if (newWeather.toLowerCase().includes("snow") || newWeather.toLowerCase().includes("hail")) {
      setNextWeather("snowy");
    } 
    setPlayAnimation(true);
    console.log("After updates: weather:", weather, "next:", nextWeather, time);
  };

  useEffect(() => {
    console.log(weather)
    if (playAnimation) {
      const timeoutId = setTimeout(() => {
        setWeather(nextWeather);
        setPlayAnimation(false);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [playAnimation]);

  return (
    <>
      <OtherBackground nextWeather={nextWeather}></OtherBackground>
      <Background weather={weather} playAnimation={playAnimation}></Background>
      <HeaderContainer>
        <WeatherCard changeWeather={changeWeather} />
      </HeaderContainer>
    </>
  );
};

const exampleKeyframe = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
  
`;

const HeaderContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 1;
`;

const Background = styled.div`
  background-image: var(--${(props) => props.weather || "default"});
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: 1;
  animation: ${props => props.playAnimation && css`${exampleKeyframe}`} 2s ease-out;
  animation-fill-mode: forwards; 
`;

const OtherBackground = styled.div`
  background-image: var(--${(props) => props.nextWeather || "default"});
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  z-index: 0;
  opacity: 1;
`;

export default App;