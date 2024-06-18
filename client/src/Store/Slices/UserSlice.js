import {createSlice} from "@reduxjs/toolkit"; 

const initialState = {
    id:'',
    name:'',
    email:'',
    isAdmin:'',
    phone:'',
    image:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAdmin = action.payload.isAdmin;
            state.phone = action.payload.phone;
            state.image = action.payload.image;

            localStorage.setItem("user",JSON.stringify(state)); 
        },
        logoutDetails:(state,action)=>{
            state.id=""
            state.name=""
            state.email=""
            state.phone=""
            state.isAdmin=""
            state.image=""
            
            localStorage.removeItem("user");
        }
    }
})

export const { setUserDetails,logoutDetails } = userSlice.actions;

export default userSlice.reducer;