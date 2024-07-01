import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useReducer } from 'react'

const baseUrl = 'http://localhost:3001/anecdotes'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "NUL":
        return null
    default:
        return state
  }
}


const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const voteAnecdote = async anecdote => {
    await axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)
  }

  const updateVoteMutation = useMutation({ 
    mutationFn: voteAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
   
  })
  //console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  //console.log(anecdotes)

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes +1 })
    notificationDispatch({ type: 'SET', payload: `voted anecdote: "${anecdote.content}"` })
    setTimeout(() => {
      notificationDispatch({ type: 'NUL' })
    }, 5000)
  }
  



  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification notification={ notification }/>

      <AnecdoteForm dispatch={notificationDispatch}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
