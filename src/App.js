import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, ListItem, ListItemText } from '@mui/material';
import CitySearch from "./CitySearch";
import WeatherList from './WeatherList';

const apiKey = 'AIzaSyAg63iH-7svmN7JWs6a-DlLhnx1653PVD4'; // Replace with your OpenWeatherMap API key

const fetchWeatherData = async (city) => {
  const geocodeResponse = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city.label}&key=${apiKey}`
  );
  const geocodeData = await geocodeResponse.json();
  //alert(JSON.stringify(geocodeData));
  if (geocodeData.status === 'OK') {
    const { lat, lng } = geocodeData.results[0].geometry.location;
    //alert(lat+"/"+lng);
    const weatherResponse = await fetch(
      `http://quillbot-task-python.172-93-54-122.nip.io/weather?lat=${lat}&lon=${lng}`
    );
    const weatherData = await weatherResponse.json();
    //alert(weatherData);
    return {city:city.label,weatherData:weatherData};
  } else {
    throw new Error('Could not find location');
  }
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const deleteCity= (city) =>{

    setWeatherData((prevWeatherData) => {
      const newWeatherData = { ...prevWeatherData }; // Create a copy
    
      delete newWeatherData[city]; // Remove the desired key
    
      return newWeatherData;
    });

  }

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeatherData(city);
      //setWeatherData(data);
      setWeatherData((prevWeatherData) => ({
        ...prevWeatherData,
        [data.city]: {...data.weatherData},
      }));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <div className="content-container">
        <div className="card-list-container">
          <CitySearch onSearch={handleSearch} />
          {weatherData && <WeatherList weatherData={weatherData} deleteCity={deleteCity} />}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div className="empty-container">
         
        </div>
      </div>
    </div>
  );
}

export default App;
