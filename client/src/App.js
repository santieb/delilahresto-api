import React, { useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'
import getUser from './services/user.js'

const App = () => {
  const [user, setUser] = useState('') 

  useEffect( () => {
    const getUserData = async () => {
      const url = window.location.href

      if(url.includes('token')) {
      try {
        const aux = url.replace("http://localhost:3001/?token=", "")
        const token = aux.replace("#_=_", "")
          
        const userData = await getUser(token)
        const user = {
          user: {
            _id: userData.user._id,
            email: userData.user.email,
            name: userData.user.name, 
            isAdmin: userData.user.isAdmin
          },
          token: token
        }
        if(userData) {
          window.localStorage.setItem('loggedUser', JSON.stringify(user))
          window.location.href = "/";
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
    getUserData()
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  return ( 
    <div className=" lg:mx-60  min-h-screen bg-slate-50 border shadow-md">
      <Header user={user}/>
      <div>
      <Routes>
        <Route path='/' element={<Home user={user}/>}></Route>
        <Route path='/my-account' element={user ? <MyAccount user={user}/> : <Home></Home>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
