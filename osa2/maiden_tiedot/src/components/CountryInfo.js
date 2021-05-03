import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ countryToShow, api_key }) => {
  //console.log(countryToShow)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    //console.log('effect')
    //console.log(countryToShow, api_key)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryToShow.capital}`)
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setWeather(response.data)
      })
  }, [countryToShow, api_key])

  return (
    <div>
      <h1>{countryToShow.name}</h1>
      <p>Capital: {countryToShow.capital}</p>
      <p>Population: {countryToShow.population}</p>
      <h2>Languages</h2>
      <ul>
        {countryToShow.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={countryToShow.flag} alt={`flag of ${countryToShow.name}`} width={200} />
      {weather !== null && weather !== undefined ?
      (
        <div>
          <h2>Weather in {countryToShow.capital}</h2>
          <p><strong>Temperature:</strong> {weather.current.temperature} Celcius</p>
          <img src={weather.current.weather_icons[0]} alt="weather state icon" />
          <p><strong>Wind:</strong> {weather.current.wind_speed} mph {weather.current.wind_dir}</p>
        </div>
      )
      :
      (<div />)
      }
      
    </div>
  )
}

export default CountryInfo