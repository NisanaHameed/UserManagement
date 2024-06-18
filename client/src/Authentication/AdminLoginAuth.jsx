import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminLoginAuth({children}) {
  const hasToken = Boolean(localStorage.getItem('adminToken'));

  return hasToken ? children: <Navigate to='/admin/login' /> ;
}

export default AdminLoginAuth
