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

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired
  }

  return (
    <div>
      <form onSubmit={login}>
        <div>
          username
          <input
            data-testid='username'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
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