import { useState, useEffect } from 'react'
import axios from 'axios'

const Render =({handleCountry, filt}) =>{
  return(
      <div>
        find countries: <input value={filt} onChange={handleCountry}/>
      </div>
  )
}

const Match=({country}) =>{
  
  console.log(country)
  return (
    <div>
    <h1>{country.name}</h1>
    <p> capital {country.capital}</p>
    <p> area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {country.languages.map(language =>
        <li key ={language}> {language}</li>)}
    </ul>
    <img src ={country.flag}/>
    </div>
    
  )
}

const Showed=({ToShow, filt})=>{
  const [selected, setSelected] = useState(null)

  const handleClick =(country) => {
    console.log(country)
    setSelected(country)
  }

  useEffect(() => {
    setSelected(null)
  }, [filt])

  const list = ToShow.map(country =>
    <p key={country.id}> {country.name} <button type="button" onClick={() => handleClick(country)}>show</button> </p>)
    if (list.length > 10){
      return(<div> 
      <p>Too many matches, specify filter</p>
      </div>)
    }
    

    if (list.length ===1) {
      return (
        <Match country={ToShow[0]}/>
      );
    }

    if (selected){
      return(
        <Match country={selected}/>
      )
    }

  return(
    <div>
      {list}
  </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filt, setFilt] = useState(
    ''
  )
  const [show, setShow] = useState(true)
  
  const ToShow = show 
    ? countries
    : countries.filter(country => country.name.toLowerCase().includes(filt.toLowerCase()))
  

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const countries =response.data.map(country => ({
          name: country.name.common,
          capital: country.capital ? country.capital[0] : '',
          area: country.area,
          languages: country.languages ? Object.values(country.languages) : [],
          flag: country.flags.png
        }))
        setCountries(countries)
      })
  },[])

  const handleCountry=(event) => {
    setShow(false)
    setFilt(event.target.value)
  }

  return (
    <div>
      <h1> countries</h1>
      <Render setFilt={setFilt} handleCountry={handleCountry}/>
      <Showed ToShow={ToShow} countries={countries} filt={filt}/>
    </div>
  )
}

export default App