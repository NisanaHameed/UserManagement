import React, { useState } from 'react'
import {adminLogin} from '../../../api/adminAPI'
import {useNavigate} from 'react-router-dom'
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error,setError] = useState('');
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const logIn = async (e) => {
    e.preventDefault();
    try {
      if(!emailPattern.test(data.email)){
        setError("Invalid email!");
        return;
      }else if(data.password.trim().length<5){
        setError("Password doesn't match!");
        return;
      }
      adminLogin(data).then((res)=>{
        if(res.status){
          localStorage.setItem("adminToken",res.token);
          navigate('/admin');
        }else{
          setError(res.error);
        }
      }).catch((err)=>{
        console.log(err);
      })

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form className=" frmstyl p-5">
        <h4 className="mt-3">Admin Login</h4>

        <label className="form-label">Email</label>
        <input type="email" className="form-control" onChange={(e) => setData({ ...data, email: e.target.value })} required aria-describedby="emailHelp/" />

        <label className="form-label mt-4">Password</label>
        <input type="password" className="form-control" onChange={(e) => setData({ ...data, password: e.target.value })} />

        <div className="d-grid gap-2 col-6 mx-auto">
          {error && <p>{error}</p>}
          <button className="btn mx-auto my-4 signup" onClick={logIn}>LOGIN</button>

        </div>

      </form>
    </div>
  )
}

export default Login
