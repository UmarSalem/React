import React, { useEffect, useState } from 'react';
import './WeatherApp.css'

import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [cityInput, setCityInput] = useState('');
    const [wicon,setWicon]=useState(clear_icon);

    const api_key = "c5adbde76e801adc7a552a840778f79a";

    const fetchData = async () => {
        if (cityInput === "") {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        
    };

    useEffect(() => {
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            const weatherIcon = weatherData.weather[0].icon;
            switch (weatherIcon) {
                case "04d":
                case "04n":
                    setWicon(cloud_icon);
                    break;
                case "09d":
                case "09n":
                    setWicon(drizzle_icon);
                    break;
                case "10d":
                case "10n":
                    setWicon(rain_icon);
                    break;
                case "13d":
                case "13n":
                    setWicon(snow_icon);
                    break;
                default:
                    setWicon(clear_icon);
                    break;
            }
        }
    }, [weatherData]);
    
    
    

    return (
        <div className='container'>
            <div className='top-bar'>
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                />
                <div className='search-icon' onClick={fetchData}>
                    <img src={search_icon} alt='' />
                </div>
            </div>
            {weatherData && weatherData.main && ( // Check if weatherData and weatherData.main are not null or undefined
                <>
                    <div className='weather-image'><img src={wicon} alt='' /></div>
                    <div className='weather-temp'>{weatherData.main.temp} C</div>
                    <div className='weather-location'>{weatherData.name}</div>
                    <div className='data-container'>
                        <div className='element'>
                            <img src={humidity_icon} alt='' className='icon' />
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.main.humidity}%</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <img src={wind_icon} alt='' className='icon' />
                            <div className='data'>
                                <div className='wind-rate'>{weatherData.wind.speed} km/h</div>
                                <div className='text'>Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
