import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  LoginForm.PropTypes = {
    handleLogin: PropTypes.func.isRequired
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          username
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm