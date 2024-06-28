import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        "content": action.payload.content,
        "id": action.payload.id,
        "votes": 0,
      }
      console.log(newAnecdote)
      state.push(newAnecdote)
    },

    addVote(state, action) {
      const id = action.payload
      console.log(id)
      const anecdoteToChange = state.find(n => n.id === id)
      
      const newAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : newAnecdote
      )
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer