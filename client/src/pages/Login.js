import React, { useState } from 'react'
import login from '../services/login'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await login({email, password})

      if (!user.token) alert('Wrong credencials')
      setToken(user.token)
      setEmail('')
      setPassword('')
      
    } catch (err) {
      alert('error', err)
    }
  }

  return ( 
    <div>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          value={email}
          name='email'
          placeholder='Email'
          onChange={({target}) => setEmail(target.value)}
        />
        <input
          type='password'
          value={password}
          name='password'
          placeholder='Password'
          onChange={({target}) => setPassword(target.value)}
        />
      <button>
        Login
      </button>
      </form>
    </div>
  )
}

export default Login