import { forecastType } from '../types'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'
import { getSunTime } from '../helpers'
import { getWindDirection } from '../helpers'
import { getHumidityValue } from '../helpers'
import { getPop } from '../helpers'
import { getVisibilityValue } from '../helpers'
import useForecast from '../hooks/useForecast'
import React from 'react'

type Props = {
  data: forecastType
  resetForecast: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Degree = ({ temp }: { temp: number }): JSX.Element => <span>{temp}°</span>

const Forecast = ({ data, resetForecast }: Props) => {
  const today = data.list[0]

  return (
    <div className="w-full h-full md:max-w-[600px] py-4 md:py-4 md:px-10 lg:px-24 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name} <span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className="text-sm">
            Highest: <Degree temp={Math.ceil(today.main.temp_max)} /> Lowest:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div
              key={i}
              className="inline-block text-center w-[50px] flex-shrink-0"
            >
              <p className="text-sm">
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                alt={`weather-icon-${item.weather[0].description}`}
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between text-zinc-700">
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
            <Sunrise /> <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
            <Sunset /> <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>

          <Tile
            icon="wind"
            title="Wind"
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`${getWindDirection(
              Math.round(today.wind.deg)
            )}, gusts 
            ${today.wind.gust.toFixed(1)} km/h`}
          />
          <Tile
            icon="feels"
            title="Feels like"
            info={<Degree temp={Math.round(today.main.feels_like)} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
          <Tile
            icon="humidity"
            title="Humidity"
            info={`${today.main.humidity} %`}
            description={getHumidityValue(today.main.humidity)}
          />
          <Tile
            icon="pop"
            title="Precipitation"
            info={`${Math.round(today.pop * 100)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          <Tile
            icon="pressure"
            title="Pressure"
            info={`${today.main.pressure} hPa`}
            description={` ${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          <Tile
            icon="visibility"
            title="Visibility"
            info={`${(today.visibility / 1000).toFixed()} km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
      <button
        className="rounded block mx-auto my-2 border-2 text-sm border-zinc-700 hover:text-zinc-100 hover:font-bold bg-zinc-700 hover:bg-opacity-10 hover:bg-zinc-100 px-2 py-1 cursor-pointer hover:border-zinc-700 text-zinc-100"
        onClick={resetForecast}
      >
        New Search
      </button>
    </div>
  )
}

export default Forecast
