import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../../../api/adminAPI'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([])
  useEffect(() => {
    getUsers().then((res) => {
      setUser(res.users);
      setSearchList(res.users);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  const deleteSubmit = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteUser(id).then((res) => {
            const newUsers = user.filter((doc) => doc._id != id)
            setUser(newUsers);
            setSearchList(newUsers);
            Swal.fire({
              title: "Deleted!",
              icon: "success"
            });
          }).catch((err) => {
            console.log(err);
          })
        }
      });

    } catch (err) {
      console.log(err);
    }
  }

  const logOut = () => {
    try {
      localStorage.removeItem("adminToken");
      navigate('/admin/login');
    } catch (err) {
      console.log(err);
    }
  }

  const searchUser = (e) => {
    const term = e.target.value;
    setSearch(term);
    if (term.trim() === "") {
      setSearchList(user);
    } else {
      const regexPattern = new RegExp(`^${term}`, 'i');
      const searchData = searchList.filter((doc) => regexPattern.test(doc.Name))
      setSearchList(searchData);
    }
  }

  return (
    <div className='outer-div'>
      <nav className="navbar bg-body-tertiary" style={{ width: 900 }}>
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="text" placeholder="Search" value={search} onChange={searchUser} />
            <button className='logout btn btn-sm' onClick={logOut}>LOG OUT</button>
            <button className='adduser btn btn-sm' onClick={() => navigate('/admin/adduser')}>ADD USER</button>
          </form>
        </div>
      </nav>
      <div className="container mt-5 userlist">

        <div className="row btnrow">

        </div>
        <div className="row mt-5">
          <div className="col-12 grid-margin">
            <div className="card" >
              <div className="card-body">
                <h4 className="card-title mb-4">Users</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Mobile No</th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        searchList.map((doc, index) => {
                         return (
                            <tr key={index}>
                              <td>{doc.Name}</td>
                              <td>{doc.Email}</td>
                              <td>{doc.Phone}</td>
                              <td>
                                <button className='btn btn-secondary btn-sm' onClick={() => { navigate(`/admin/edituser/${doc._id}`) }}>EDIT</button>
                                <button className='btn btn-danger btn-sm' onClick={() => deleteSubmit(doc._id)}>DELETE</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
