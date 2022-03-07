import React, { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'

const App = () => {
  const [user, setUser] = useState('') 

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  return ( 
    <div class="md:mx-60  min-h-screen bg-slate-50 border shadow-md">
      <Header user={user}/>
      <div>
      <Routes>
        <Route path='/' element={<Home user={user}/>}></Route>
        <Route path='/my-account' element={<MyAccount user={user}/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
