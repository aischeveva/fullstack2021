import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Weather = ( {capital} ) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [capital])
    return (
        <div>
            <h2>Weather in {capital} </h2>
            <p><b>temperature: </b> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt="" />
            <p><b>wind: </b> {weather.wind_speed} k/h direction {weather.wind_dir} </p>
        </div>
    )
}

const Country = ({ country, only, handleShow }) => {
    if (only){
        return(
            <div>
                <h1> {country.name} </h1>
                <p>capital {country.capital} </p>
                <p>population {country.population} </p>
                <h2>Languages</h2>
                <ul>
                    {country.languages.map(language =>
                        <li key={language.iso639_1} > {language.name} </li>
                    )}
                </ul>
                <img src={country.flag} alt="" width="200" height="200" />
                <Weather capital={country.capital} />

            </div>
        )
    }
    
    return (
        <li> {country.name}
            <button value={country.name} onClick={handleShow} >show</button>
        </li>
    )
}

const Countries = ({ countries, handleShow }) => {
    if(countries.length > 10){
        return (
            <p>
                Too many matches, specify another filter.
            </p>
        )
    }
    const only = countries.length === 1
    return (
        <ul>
            {countries.map( country => <Country key={country.name} country={country} only={only} handleShow={handleShow} /> )}
        </ul>
    )
}

export default Countries