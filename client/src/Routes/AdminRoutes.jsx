import React from 'react'
import { Routes,Route } from 'react-router-dom'
import LoginPage from '../pages/Admin/LoginPage'
import DashboardPage from '../pages/Admin/DashboardPage'
import AddUserPage from '../pages/Admin/AddUserPage'
import EditUserPage from '../pages/Admin/EditUserPage'
import AdminLogoutAuth from '../Authentication/AdminLogoutAuth'
import AdminLoginAuth from '../Authentication/AdminLoginAuth'

function AdminRoutes() {
  return (
      <Routes>
        <Route path='/' element={< AdminLoginAuth>< DashboardPage /></AdminLoginAuth>}></Route>
        <Route path='/login' element={<AdminLogoutAuth>< LoginPage /></AdminLogoutAuth>}></Route>
        <Route path='/adduser' element={< AdminLoginAuth>< AddUserPage /></AdminLoginAuth>}></Route>
        <Route path='/edituser/:id' element={< AdminLoginAuth>< EditUserPage /></AdminLoginAuth>}></Route>
      </Routes>
  )
}

export default AdminRoutes
