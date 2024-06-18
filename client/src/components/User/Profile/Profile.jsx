import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetails } from '../../../Store/Slices/UserSlice'
import { updateProfileAPI } from '../../../api/userAPI'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const oldData = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(oldData)

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState(storedUser || oldData);
  console.log(userData)
  const updateProfile = (e) => {
    e.preventDefault();
    try {
      if (!emailPattern.test(userData.email)) {
        setError("Enter a valid email!");
        return;
      } else if (!userData.name.trim().length) {
        setError("Enter name!");
        return;
      } else if (userData.phone && userData.phone.length < 10) {
        setError("Enter a valid phone number!");
        return;
      }
      console.log(userData.image)
      updateProfileAPI(userData).then((res) => {
        if (res.status) {
          console.log(res.user.Image)
          dispatch(
            setUserDetails({
              id: res.user._id,
              name: res.user.Name,
              email: res.user.Email,
              phone: res.user.Phone,
              image: res.user.Image,
              isAdmin: res.user.isAdmin
            })
          )

          setUserData({
            ...userData,
            image: res.user.Image
          })

          setIsEditing(false);
        }
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div>
      <div className="profile-container">
        <img className="profile-image" src={userData ? `http://localhost:4000/${userData.image}` : "hijab.jpg"} alt="Profile Picture" />
        {isEditing ? (
          <div className="profile-infoedit">
            <label>Name</label>
            <input type="text" onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} value={userData.name} />
            <label>Email</label>
            <input type="text" onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} value={userData.email} />
            <label>Phone</label>
            <input type="text" onChange={(e) => { setUserData({ ...userData, phone: e.target.value }) }} value={userData.phone} />

            <input type="file" className="file-input" accept="image/*" onChange={(e) => { setUserData({ ...userData, image: e.target.files[0] }) }} />
            <button type="button" onClick={updateProfile}>Submit</button>
          </div>
        ) :
          (
            <div className="profile-info">

              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
              <p>{userData.phone}</p>
              <button type="button" onClick={() => { setIsEditing(!isEditing) }}>Edit Profile</button>
            </div>
          )
        }

      </div>

    </div>
  )
}

export default Profile
