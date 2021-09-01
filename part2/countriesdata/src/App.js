import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

function App() {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter filter={filter} filterChange={filterChange} />
      <Countries countries={countriesToShow} handleShow={filterChange} />
    </div>
  );
}

export default App;
