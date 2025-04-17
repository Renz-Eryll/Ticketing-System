import React from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function () {
    
  return (
    <div><Outlet/></div>
  )
}
