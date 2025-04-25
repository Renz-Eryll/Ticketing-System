import React from 'react'
import useUser from '../hooks/use-user'

const AuthMiddleware = ({ children }) => {
    const user = useUser();

  return (
    <>
        {/* to be continue */}
    </>
  )
}

export default AuthMiddleware