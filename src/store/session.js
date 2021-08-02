import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

export const registerUser = createAsyncThunk("registerUser", user => {
  return axios
    .post(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/auth/register`, user)
    .then(res => {
      if (typeof res.data !== "string") {
        message.success("Succesfully registered");
        console.log(res.data);
        return res.data;
      }
      return message.error(`Error: ${res.data}`, 5);
    })
    .catch(err => message.error(err, 5));
});

export const loginUser = createAsyncThunk("loginUser", user => {
  return axios
    .post(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/auth/login`, user)
    .then(res => res.data)
    .then(data => {
      message.success(`Welcome Back ${data.name}!`);
      return data;
    });
});

export const fetchUser = createAsyncThunk('fetchUser', () =>{
  return axios.get(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/auth/me`)
    .then(res => res.data)
    .then(data => {
      message.success(`Welcome Back ${data.name}!`);
      return data;
    })
    .catch(err =>{ console.log(err)})
})

export const logoutUser = createAsyncThunk("logoutUser", () => {
  return axios.post(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/auth/logout`).then(res => console.log(res));
});

export const addFav = createAsyncThunk("addFav", (fav, ThunkApi) => {
  const { user } = ThunkApi.getState();
  if (!user.favs.some(element => element.imdbID === fav.movie.imdbID)) {
    return axios
      .put(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/favourites`, fav)
      .then(res => res.data)
      .then(favs => favs)
      .catch(err => message.error("Parece que hubo un problema al agregar a favoritos", 5));
  }
});

export const getFav = createAsyncThunk("getFav", id => {
  return axios
    .get(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/favourites?userID=${id}`)
    .then(res => res.data)
    .then(favs => favs)
    .catch(err => message.error("No se pudieron recuperar tus favoritos", 5));
});

export const deleteFav = createAsyncThunk('deleteFav', (query) =>{
  return axios.delete(`https://ec2-18-228-121-134.sa-east-1.compute.amazonaws.com:3000/api/favourites?imdbID=${query.imdbID}&userId=${query.userId}`)
    .then(res=> res.data)
    .then(favs => favs)
    .catch(err => message.error("No se pudo borrar de tus favoritos", 5));
})

const sessionReducer = createReducer(
  {
    success: false,
    user: {},
    favs: [],
    pending: false,
  },
  {
    [registerUser.fulfilled]: (state, action) => {
      if (typeof action.payload === "boolean") return { ...state, success: false, user: {} };
      return { ...state, success: true, user: action.payload };
    },
    [loginUser.fulfilled]: (state, action) => {
      console.log("==================SUCCESFULLY LOGED IN==================");
      return { ...state, success: true, user: action.payload };
    },
    [loginUser.rejected]: (state, action) => {
      message.error("Datos incorrectos, intente nuevamente", 5);
    },
    [fetchUser.fulfilled]: (state, action) =>{
      if(action.payload) {
        console.log("==================SUCCESFULLY LOGED IN==================");
        return{ ...state, success: true, user: action.payload }
    };
    },
    [logoutUser.fulfilled]: (state, action) => {
      console.log("==================SUCCESFULLY LOGED OUT==================");
      return { ...state, success: false, user: {}, favs: [] };
    },
    [addFav.pending]: (state, action) =>{
      return {...state, pending:true }
    },
    [addFav.fulfilled]: (state, action) => {
      if (typeof action.payload === "boolean") return { ...state };
      console.log("==================FAV ADDED SUCCESFULLY==================");
      message.success('Movie successfully added to favourites!', 1)
      return { ...state, favs: action.payload, pending: false};
    },
    [getFav.fulfilled]: (state, action) => {
      if (typeof action.payload === "boolean") return console.log('pelotudo!');;
      console.log("==================FAVs RECIEVED SUCCESFULLY==================");
      return { ...state, favs: action.payload};
    },
    [deleteFav.fulfilled]: (state, action) =>{
      if (typeof action.payload === "boolean") return { ...state };
      console.log("==================FAV REMOVED SUCCESFULLY==================");
      message.success('Movie successfully removed from favourites!', 1)
      return { ...state, favs: action.payload, pending: false};
    },
    [deleteFav.pending]: (state, action) =>{
      return {...state, pending:true}
    }
  }
);

export default sessionReducer;
