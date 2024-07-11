
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"
import { ME } from "../queries"

const Recommended = (props) => {
  const genre =  useQuery(ME)
  const favorite = genre.data?.me?.favoriteGenre
  console.log(favorite)
  const list =  useQuery(ALL_BOOKS, { 
    variables: { genre: favorite },
    skip: !favorite,
    fetchPolicy: "no-cache" 
  })
  
  if (!props.show) {
    return null
  }

  if (list.loading) {
    return <div>Loading...</div>
  }

  console.log(list.data)

  if (list.data.allBooks.length < 1) {
    return <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre:</p>
      no books in your favorite genre</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre:</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {list.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
  
export default Recommended