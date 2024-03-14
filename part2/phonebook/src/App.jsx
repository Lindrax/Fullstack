import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'0001' },
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
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
      
      Filter shown with <input value={filt} onChange={handleFilt}/>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      
      {ToShow.map(person =>
        <p key={person.name}> {person.name} {person.number}</p>
      )}
      
      ...
    </div>
  )
}

export default App