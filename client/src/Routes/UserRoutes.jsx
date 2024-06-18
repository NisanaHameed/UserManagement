import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/User/LoginPage'
import SignUpPage from '../pages/User/SignUpPage'
import HomePage from '../pages/User/HomePage'
import UserProfilePage from '../pages/User/UserProfilePage'
import UserLogoutAuth from '../Authentication/UserLogoutAuth'
import UserLoginAuth from '../Authentication/UserLoginAuth'

function UserRoutes() {
  return (
    <Routes>
      <Route path='/' element={<UserLoginAuth> < HomePage /> </UserLoginAuth>}></Route>
      <Route path='/login' element={<UserLogoutAuth> <LoginPage /> </UserLogoutAuth>}></Route>
      <Route path='/signup' element={<UserLogoutAuth> < SignUpPage /> </UserLogoutAuth>}></Route>
      <Route path='/profile' element={<UserLoginAuth> < UserProfilePage /> </UserLoginAuth>}></Route>
    </Routes>
  )
}

export default UserRoutes
