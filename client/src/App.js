import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return ( 
    <div>
      <Header/>
      <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </div>
    </div>
  )
}

export default App;
