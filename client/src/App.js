import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Profile from './pages/Profile'
import Chat from "./pages/Chat.js"
import TeacherSignup from './pages/Auth/TeacherSignup.js'
import StudentSignup from './pages/Auth/StudentSignup.js'
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/chat' element={<Chat/>}/>
    <Route path='/teachersignup' element={<TeacherSignup/>}/>
    <Route path='/studentsignup' element={<StudentSignup/>}/>

   </Routes>
   </>
  )
}

export default App