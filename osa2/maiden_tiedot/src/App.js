import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo = ({ countryToShow }) => {
  //console.log(countryToShow)
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
    </div>
  )
}

const FilterTool = ({ updateFilterText, filterText }) => {
  return (
    <div>
      Find countries: <input onChange={updateFilterText} value={filterText}></input>
    </div>
  )
}

function App() {

  const [ filterText, setFilterText ] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const updateFilterText = (event) => {
    //console.log(event.target.value)
    setFilterText(event.target.value)
    setShownCountries(
      countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())).map((country) => {
        return country.name
      })
    )
  }

  let countriesInfo
  
  if (shownCountries.length === 0) {
    countriesInfo = <p>No countries found</p>
  }
  else if (shownCountries.length === 1) {
    const countryToShow = countries.find(country => country.name === shownCountries[0])
    //console.log(countryToShow)
    countriesInfo = <CountryInfo countryToShow={countryToShow} />
  } else if (shownCountries.length >= 2 && shownCountries.length <= 10) {
    countriesInfo = shownCountries.map(country => {
      return <p key={country}>{country} <button value={country} onClick={updateFilterText}>show</button></p>
    })
  } else {
    countriesInfo = <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      <FilterTool updateFilterText={updateFilterText} filterText={filterText} />
      <div>
        {countriesInfo}
      </div>
    </div>
  );
}

export default App;
