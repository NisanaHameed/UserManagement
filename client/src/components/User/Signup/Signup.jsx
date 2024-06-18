import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../../../api/userAPI'
import { useDispatch,useSelector } from 'react-redux'
import './Signup.css'
import { setUserDetails } from '../../../Store/Slices/UserSlice'

function Signup() {
    let userdtls = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error,setError] = useState('');
    const emailPattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const signUp = async (e) => {
       try{
        e.preventDefault();
        if(!data.name.trim().length){
            setError("Enter name!");
            return;
        }else if(!emailPattern.test(data.email)){
            setError("Enter a valid email!");
            return;
        }else if(data.password.trim().length<5){
            setError("Password must contain atleast 5 characters!");
            return;
        }

        let signupResponse = await userSignup(data);
        
        if(signupResponse.status){
            localStorage.setItem('token',signupResponse.token)
            dispatch(setUserDetails({
                id:signupResponse.user._id,
                name:signupResponse.user.Name,
                email:signupResponse.user.Email,
                isAdmin:signupResponse.user.isAdmin,
                phone:"",
                image:""
            }))
           
            navigate('/login');
        }else{
            setError(signupResponse ? signupResponse.error : 'Unknown error')
        }
       } catch(err){
        console.log(err.message);
       }
        
    }

    return (
        <div>
            <form className='signupform'>
                <div style={{ marginTop: 130 }}>
                    <label>Username</label>
                    <input type="text" onChange={(e) => { setData({ ...data, name: e.target.value }) }} required />

                    <label>Email</label>
                    <input type="email" onChange={(e) => { setData({ ...data, email: e.target.value }) }} required />

                    <label>Password</label>
                    <input type="password" onChange={(e) => { setData({ ...data, password: e.target.value }) }} required />
                    {error && <p style={{color:'red'}}>{error}</p>}

                    <button className='mt-4 signup' type="submit" onClick={signUp}>Sign Up</button>
                </div>
            </form>

        </div>
    )
}

export default Signup
