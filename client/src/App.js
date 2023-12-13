import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Profile from './pages/Profile'
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>

   </Routes>
   </>
  )
}

export default App