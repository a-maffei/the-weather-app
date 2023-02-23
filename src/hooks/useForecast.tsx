import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getSearchOpptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data))
      .catch((error) => console.log(error));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;
    getSearchOpptions(value);
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(`${city.name}, ${city.country}`);
      setOptions([]);
    }
  }, [city]);

  const getForecast = (city: optionType) => {
    setLoading(true);
    console.log(loading);
    setTimeout(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&units=metric&lon=${city.lon}&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          const forecastData = {
            ...data.city,
            list: data.list.slice(0, 16),
          };
          setLoading(false);
          setForecast(forecastData);
        })
        .catch((error) => console.log(error));
    }, 500);
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  return {
    forecast,
    options,
    term,
    loading,
    setForecast,
    setTerm,
    onOptionSelect,
    onSubmit,
    onInputChange,
  };
};

export default useForecast;
