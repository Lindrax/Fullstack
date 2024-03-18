import { useEffect, useState } from 'react'
import axios from 'axios'

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

const Showed=({ToShow})=>{
  return(
    <div>
  {ToShow.map(person =>
    <p key={person.name}> {person.name} {person.number}</p>
  )}
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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const ToShow = show
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filt.toLowerCase()))
  
  const addName = (event) =>{
    event.preventDefault()
    let d=0

    persons.forEach((element, index) => {
      if (element.name === newName) {
        d=1
      }
  })

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (d==1){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
      
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



  return (
    <div>
      <h2>Phonebook</h2>
      
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
      
      <Showed ToShow={ToShow}/>
    </div>
  )
}

export default App