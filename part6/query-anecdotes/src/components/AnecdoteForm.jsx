import axios from 'axios'

import { useMutation, useQueryClient } from '@tanstack/react-query'

const baseUrl = 'http://localhost:3001/anecdotes'

const AnecdoteForm = ({ dispatch}) => {
  const queryClient = useQueryClient()

  const createAnecdote = async newAnecdote =>{
    console.log(newAnecdote)
    await axios.post(baseUrl, newAnecdote).then(res => res.data)}

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: () => {
      dispatch({ type: 'SET', payload: `too short, anecdote must have length 5 or more"` })
      setTimeout(() => {
        dispatch({ type: 'NUL' })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
     
      console.log('new anecdote')
      const anecdote = {
        content: content,
        votes: 0
      }
      newAnecdoteMutation.mutate(anecdote)
      dispatch({ type: 'SET', payload: `Created anecdote: "${content}"` })
      setTimeout(() => {
        dispatch({ type: 'NUL' })
      }, 5000)
    }



  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
