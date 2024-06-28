import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
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

export const { updateAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  const anecdote = {
    ...content,
    votes: content.votes +1
  }
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(content.id, anecdote)
    dispatch(updateAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer