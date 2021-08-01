import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('getUsers', () =>{
   return axios.get(`${process.env.API_URL}/api/users`)
    .then(res => res.data)
    .then(users => users)
})

const usersReducer = createReducer([], {
  [getUsers.fulfilled]: (state, action) => (action.payload),
});

export default usersReducer;
