import { useState } from 'react'
import './App.css'
import {Route,Routes } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'


function App() {


  return (
    <>
    <Routes>
    <Route path='/' element={<Signin/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Dashboard' element={<Dashboard/>}/>
   </Routes>
    </>
  );
}

export default App
