import axios from 'axios';
import { SearchType } from '../types';

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    const apiKey = '10cb7769035ed8b537da01a8ac2b8b2b'; // process.env.REACT_APP_API_KEY;
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;

      const { data } = await axios.get(geoUrl);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchWeather,
  };
}
