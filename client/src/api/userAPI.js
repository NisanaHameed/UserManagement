import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:4000"
})

const userSignup = async (signupData) => {
    try {
        const data = await userApi.post('/signup', signupData)
        console.log('Data' + data)
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}

const userLogin = async (loginData) => {
    try {
        const data = await userApi.post('/login', loginData)
        console.log(data)
        return data.data;
    } catch (err) {
        console.log(err);
    }
}

const updateProfileAPI = async ({ name, email, phone, image, id }) => {
    try {
        const data = new FormData()
        data.append("id", id)
        data.append("name", name);
        data.append("email", email);
        data.append("phone", phone);
        data.append("image", image);

        const config = {
            header: {
                "content-type": "multipart/form-data",
                userId: id
            },
            withCredentials: true
        }
        const response = await userApi.post('/updateProfile', data, config)
        return response.data;
    } catch (err) {
        console.Console.log(err);
    }
}

export { userSignup, userLogin, updateProfileAPI }