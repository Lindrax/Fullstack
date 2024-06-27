
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
  const dispatch = useDispatch()
  

  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.filter === 'ALL'
      ? state.anecdotes.filter(anecdote => anecdote.content)
      : state.anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  })

  return(
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
  
}



export default Anecdotes