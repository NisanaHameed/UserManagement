import React from 'react'
import {Navigate} from 'react-router-dom'

function UserLoginAuth({children}) {

  const hasToken = Boolean(localStorage.getItem('token'));

  return hasToken ? children : < Navigate to='/login' />
}

export default UserLoginAuth
