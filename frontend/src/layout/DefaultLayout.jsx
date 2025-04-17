import React from 'react'
import { Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';

export default function DefaultLayout() {
    const {login} = useStateContext();
        // Redirect if not logged in
      if(!login && !user){
        return <Navigate to ='/'/>
      }
  return (
    <div><Outlet/></div>
  )
}
