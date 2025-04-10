import { useState } from 'react'
import './App.css'
import {Route,Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/SignUp'


function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Signin/>}/>
    <Route path='/Signup' element={<Signup/>}/>
   </Routes>
    </>
  );
}

export default App
