import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { UPDATE_AUTHOR } from "../queries"
import { ALL_AUTHORS } from "../queries"


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)

  const [ changedAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [  { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changedAuthor({ variables: { name, born: parseInt(born) } })

    
    setBorn('')
  }


  if (!props.show) {
    return null
  }
  const request = authors
  
  if ( request.loading ) {
    return <div>loading...</div>
  }

  const authorlist = request.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorlist.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select onChange={({ target }) => setName(target.value)}>
            {authorlist.map((a) => (
              <option  key={a.name} value={a.name}>
                {a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born<input value={born} onChange={({ target }) => setBorn(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
