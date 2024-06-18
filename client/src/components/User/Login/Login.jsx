import React, { useState } from 'react'
import './Login.css'
import { userLogin } from '../../../api/userAPI'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../../Store/Slices/UserSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState('');
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const logIn = async (e) => {
    e.preventDefault();
    if (!emailPattern.test(data.email)) {
      setError("Enter a valid email!");
      return;
    } else if (!data.password.length) {
      setError("Enter password!");
      return;
    }

    const loginResponse = await userLogin(data);
    if(loginResponse.status){
      localStorage.setItem('token',loginResponse.token)
      dispatch(setUserDetails({
        id:loginResponse.user._id,
        name:loginResponse.user.Name,
        email:loginResponse.user.Email,
        phone:loginResponse.user.Phone,
        isAdmin:loginResponse.user.isAdmin,
        image:loginResponse.user.Image
      }))
      
      navigate('/');
    }else{
      setError(loginResponse.error);
    }

  }
  return (
    <div>
      <form className='userlogin'>
        <div style={{ marginTop: 130 }}>
          <label>Email</label>
          <input type="email" onChange={(e) => setData({ ...data, email: e.target.value })} required />

          <label>Password</label>
          <input type="password" onChange={(e) => setData({ ...data, password: e.target.value })} required />
          <p className='register' onClick={()=>navigate('/signup')}>
            SignUp?
             </p>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className='mt-4 loginbtn' type="submit" onClick={logIn}>Login</button>  
        </div>
      </form>
    </div>
  )
}

export default Login
