import axios from 'axios'

const adminAPI = axios.create({
    baseURL: "http://localhost:4000/admin"
})

const adminLogin = async (loginData) => {
    try {
        const res = await adminAPI.post('/login', loginData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const getUsers = async () => {
    try {
        const res = await adminAPI.get('/');
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const addUser = async (userData) => {
    try {
        console.log(userData)
        const res = await adminAPI.post('/adduser', userData);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const loadUpdate = async (id) => {
    try {
        const res = await adminAPI.post('/loadupdate', { id });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (userdata, id) => {
    try {
        userdata.id = id
        const res = await adminAPI.post('/edituser', userdata);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (id) => {
    try {
        const res = await adminAPI.post('/deleteuser', {id});
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export { adminLogin, getUsers, loadUpdate, updateUser, deleteUser, addUser }