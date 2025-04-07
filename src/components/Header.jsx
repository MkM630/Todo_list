import React, { useEffect, useState } from 'react';
import { IconMoon, IconSun } from './icons';

const initialStateDarkMode = localStorage.getItem('theme') === 'dark';

const Header = () => {
  const [darkMode, setDarkMode] = useState(initialStateDarkMode);
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('New Delhi');
  const [inputLocation, setInputLocation] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'e842ed74d50b83e0334dc8739652755e';
      try {
        const response = await fetch(
          `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`
        );
        const data = await response.json();
        if (data && data.current) {
          setWeather(data.current);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [location]);

  const handleLocationChange = () => {
    if (inputLocation.trim()) {
      setLocation(inputLocation.trim());
      setInputLocation('');
    }
  };

  return (
    <header className="container mx-auto px-6 pt-11 md:max-w-xl">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase text-black dark:text-white">
          Mainak's <h1 className="tracking-[0.25em]">TODO LIST</h1>
        </h1>
        <button type="button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <IconSun /> : <IconMoon />}
        </button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Enter location"
          className="p-2 rounded"
        />
        <button
          onClick={handleLocationChange}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      {weather && (
        <div
          className={`mt-4 ${
            darkMode ? 'text-white' : 'text-black'
          }`}
        >
          <p>Location: {weather.location?.name || location}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.weather_descriptions?.[0] || 'N/A'}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
