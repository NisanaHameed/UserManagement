import {React} from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logoutDetails} from '../../../Store/Slices/UserSlice'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const logout = ()=>{
    localStorage.removeItem('token');
    dispatch(logoutDetails());
    navigate('/login')
  }
  return (
    <div className='home'>
      <div className='btns'>
      <button onClick={()=>{navigate('/profile')}}>Profile</button>
      <button onClick={logout}>Logout</button>
      </div>
      <h1>WELCOME!!</h1>
    </div>
  )
}

export default Home
