import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter=({filt, handleFilt}) =>{
  return(
    <div>
      Filter shown with <input value={filt} onChange={handleFilt}/>
    </div>
  )
}

const NewPerson=({newName, newNumber, handeNumberChange, handleNameChange, addName}) =>{
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handeNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Showed=({ToShow, del})=>{
  return(
    <div>
      <form>
  {ToShow.map(person =>
    <p key={person.id}> {person.name} {person.number} <button type="button" onClick={() => del(person.id, person.name)}>delete</button> </p>
  )}
  </form>
  </div>
  )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState(
    ''
    )
  const [newNumber, setNumber] = useState(
    ''
  )
  const [show, setShow] = useState(true)
  const [filt ,setFilt] =useState(
    ''
  )
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('notification')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const ToShow = show
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filt.toLowerCase()))
  
  const addName = (event) =>{
    event.preventDefault()
    let d=0
    let id=0
    persons.forEach((element, index) => {
      if (element.name === newName) {
        d=1
        id=element.id
      }
  })
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (d==1){
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(n=> n.id === id)
        console.log(person)
        const changedperson = {... person, number : newNumber}
        console.log(changedperson)
        personService
          .update(id, changedperson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response))
            setErrorType('notification')
            setErrorMessage(
              `Number changed succesfully`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorType('error')
            console.log(error.response.data)
            console.log("tsedaus")
            
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
    else{
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorType('notification')
          setErrorMessage(
            `${newName} added succesfully`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorType('error')
          console.log(error.response.data)
          console.log("tsedaus")
          
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNumber('')
  }

  const handleNameChange=(event) => {
    setNewName(event.target.value)
  }

  const handeNumberChange=(event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  const handleFilt=(event) => {
    setShow(false)
    console.log(event.target.value)
    setFilt(event.target.value)
  }

  const del = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      console.log(id)
      personService
        .del(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setErrorType('notification')
          setErrorMessage(
            `${name} deleted succesfully`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorType('error')
          setErrorMessage(
            `information of ${name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
          
   
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType}/>
      
      <Filter filt={filt} handleFilt={handleFilt} />
      <h2>add a new</h2>
      <NewPerson
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handeNumberChange={handeNumberChange}
      addName={addName}
      />
      <h2>Numbers</h2>
      
      <Showed ToShow={ToShow} del={del}/>
    </div>
  )
}

export default App