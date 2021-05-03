import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'
import FilterTool from './components/FilterTool'

function App() {

  const [ filterText, setFilterText ] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])

  //console.log(process.env.REACT_APP_API_KEY)
  const api_key = process.env.REACT_APP_API_KEY

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
    countriesInfo = <CountryInfo countryToShow={countryToShow} api_key={api_key} />
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
