import React, { useState } from 'react'
import { addUser } from '../../../api/adminAPI'
import { useNavigate } from 'react-router-dom'
import './AddUser.css'

function AddUser() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const addUserSubmit = async (e) => {
        e.preventDefault();
        try {
        if(!emailPattern.test(user.email)){
            setError("Enter a valid email!");
            return;
        }else if(!user.name.trim().length){
            setError("Enter a valid name!");
            return;
        }else if(user.phone.length<10){
            setError("Enter Phone!");
            return;
        }

            addUser(user).then((res) => {
                console.log(res.status)
                navigate('/admin');
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title pb-5">Add User</h4>
                    <form className="forms-sample adduserform">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="number" className="form-control" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required />
                        </div>
                        {error && <p className="text-danger mt-3" id="error">{error}</p>}

                        <button className="btn btn-secondary mt-4" onClick={addUserSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser
