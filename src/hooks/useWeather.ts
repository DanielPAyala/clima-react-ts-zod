import axios from 'axios';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { SearchType } from '../types';

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  }),
});

const initialWeather = Weather.parse({
  name: '',
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  },
});

export type WeatherType = z.infer<typeof Weather>;

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherType>(initialWeather);

  const [loading, setLoading] = useState(false);

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setWeather(initialWeather);
    setLoading(true);
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

      const { data } = await axios.get(geoUrl);

      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const { data: weatherResult } = await axios.get(weatherUrl);

      const result = Weather.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Error fetching data from API',
          error.response?.data || error.message
        );
      } else if (error instanceof z.ZodError) {
        console.error('Validation error', error.errors);
      } else {
        console.error('Unknown error', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    weather,
    loading,
    fetchWeather,
    hasWeatherData,
  };
}
