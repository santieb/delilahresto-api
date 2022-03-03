import React, { useState } from 'react'
import login from '../../services/login'

const Login = ({user} ) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const { user } = await login({email, password})
      if (!user) alert('Wrong credencials')
      else {
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      window.location.href = "/";
      }

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
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login