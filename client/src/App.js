import React, { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  const [user, setUser] = useState('') 

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])
  
  return ( 
    <div>
      <Header user={user}/>
      <div>
      <Routes>
        <Route path='/' element={<Home user={user}/>}></Route>
        <Route path='/login' element={<Login user={user}/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
