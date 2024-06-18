import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom' ;
import {loadUpdate,updateUser} from '../../../api/adminAPI'

const initialState = {
    name:"",
    email:"",
    phone:""
}

function EditUser() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState(initialState);
    const [error,setError] = useState('');
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(()=>{
        loadUpdate(id).then((res)=>{
            setUser({
                name:res.user.Name,
                email:res.user.Email,
                phone:res.user.Phone
            });
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const submitUpdate = async(e)=>{
        try{
            e.preventDefault();

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

            updateUser(user,id).then((res)=>{
                if(res.status){
                    navigate('/admin')
                }else{
                    setError(res.error);
                }
            })
            
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="container">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title pb-5">Edit User</h4>
                    <form className="forms-sample adduserform">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={(e)=>setUser({...user,name:e.target.value})} value={user.name} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" onChange={(e)=>setUser({...user,email:e.target.value})} value={user.email} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="number" className="form-control" onChange={(e)=>setUser({...user,phone:e.target.value})} value={user.phone} />
                        </div>
                        <p className="text-danger mt-3" id="error"></p>
                        {error && <p>{error}</p>}
                        <button type="submit" className="btn btn-secondary mt-4" onClick={submitUpdate}>Submit</button>
                    </form>                    
        </div>
    </div>
</div>
  )
}

export default EditUser
