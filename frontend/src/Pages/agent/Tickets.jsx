import React from 'react'

export default function Tickets() {
    const { activeMenu,user,login } = useStateContext();
      
      // Redirect if not logged in
      if(!login && !user){
        return <Navigate to ='/'/>
      }
  return (
    <div>Tickets</div>
  )
}

