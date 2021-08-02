import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('getUsers', () =>{
   return axios.get(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/users`)
    .then(res => res.data)
    .then(users => users)
})

const usersReducer = createReducer([], {
  [getUsers.fulfilled]: (state, action) => (action.payload),
});

export default usersReducer;
