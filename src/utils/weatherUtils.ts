import type { WeatherData } from '../types';

export const getWeatherEmoji = (wmoCode: number): string => {
  const weatherMap: { [key: number]: string } = {
    0: '☀️',  // Clear sky
    1: '🌤️', // Mainly clear
    2: '⛅', // Partly cloudy
    3: '☁️',  // Overcast
    45: '🌫️', // Foggy
    48: '🌫️', // Depositing rime fog
    51: '🌧️', // Light drizzle
    53: '🌧️', // Moderate drizzle
    55: '🌧️', // Dense drizzle
    61: '🌧️', // Slight rain
    63: '🌧️', // Moderate rain
    65: '🌧️', // Heavy rain
    71: '🌨️', // Slight snow
    73: '🌨️', // Moderate snow
    75: '🌨️', // Heavy snow
    77: '🌨️', // Snow grains
    80: '🌧️', // Slight rain showers
    81: '🌧️', // Moderate rain showers
    82: '🌧️', // Violent rain showers
    85: '🌨️', // Slight snow showers
    86: '🌨️', // Heavy snow showers
    95: '⛈️', // Thunderstorm
    96: '⛈️', // Thunderstorm with slight hail
    99: '⛈️'  // Thunderstorm with heavy hail
  };

  return weatherMap[wmoCode] || '❓';
};

export const fetchWeatherData = async (date: Date): Promise<WeatherData> => {
  try {
    const latitude = 50.8503; // Brussels latitude
    const longitude = 4.3517; // Brussels longitude
    const formattedDate = date.toISOString().split('T')[0];

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${formattedDate}&end_date=${formattedDate}&daily=temperature_2m_max,precipitation_sum,windspeed_10m_max,cloudcover_mean,weathercode&timezone=Europe/Brussels`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}`);
    }

    const data = await response.json();

    // Add error checking for missing data
    if (!data.daily || !Array.isArray(data.daily.temperature_2m_max)) {
      throw new Error('Invalid weather data format');
    }

    return {
      temperature: data.daily.temperature_2m_max[0] ?? 0,
      precipitation: data.daily.precipitation_sum[0] ?? 0,
      windSpeed: data.daily.windspeed_10m_max[0] ?? 0,
      cloudCover: data.daily.cloudcover_mean[0] ?? 0,
      weatherCode: data.daily.weathercode[0] ?? 0,
      weatherEmoji: getWeatherEmoji(data.daily.weathercode[0] ?? 0)
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return default weather data instead of throwing
    return {
      temperature: 0,
      precipitation: 0,
      windSpeed: 0,
      cloudCover: 0,
      weatherCode: 0,
      weatherEmoji: '❓'
    };
  }
};