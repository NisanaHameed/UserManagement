import React, { Children } from 'react'
import { Navigate } from 'react-router-dom'

function UserLogoutAuth({children}) {
  const hasToken = Boolean(localStorage.getItem('token'));

  return hasToken ? < Navigate to='/' /> : children;
}

export default UserLogoutAuth;
