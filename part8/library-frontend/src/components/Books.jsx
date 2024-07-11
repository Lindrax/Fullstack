import { useEffect, useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const list = useQuery(ALL_BOOKS)
  const { loading, data } = useQuery(ALL_BOOKS, { 
    variables: { genre },
    fetchPolicy: "no-cache" 
  })

  useEffect(() => {
    if (list.data) {
      const uniqueGenres = [... new Set(list.data.allBooks.flatMap(book => book.genres))]
      setGenres(uniqueGenres)
    }
  }, [list.data]);

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const booklist = data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booklist.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} value={g} onClick={()=> setGenre(g)}> {g} </button>
        )
        )}
        <button value={null} onClick={() => setGenre(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books
