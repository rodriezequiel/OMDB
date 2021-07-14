import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

import { seed } from "../utils/seed";

export const setFilms = createAsyncThunk("getFilms", (query) => {
  let axiosArr = []
  for(let i=1; i<=5; i++){
    axiosArr.push(axios.get(`https://www.omdbapi.com/?apikey=20dac387&s=${query}&page=${i}`))
  }
  return Promise.all(axiosArr)
    .then((resul) => resul.map(e => e.data))
    .then((films) => {
      if(films[0].Response === 'True'){
       films[0].Search = films[0].Search.concat(films[1].Search,films[2].Search,films[3].Search, films[4].Search)
       return films[0];
      }else return films[0];
    });
});

export const setSingleFilm = createAsyncThunk("setSingleFilm", (match) => {
  return axios
    .get(
      `https://www.omdbapi.com/?apikey=20dac387&i=${match.params.id}&plot=full`
    )
    .then((resul) => resul.data)
    .then((film) => film);
});

const setFilmsReducer = createReducer(seed, {
  [setFilms.fulfilled]: (state, action) => ({
    ...state,
    query: action.payload,
  }),
  [setFilms.pending]: (state, action) => ({
    ...state,
    Response: 'False',
  }),
  [setSingleFilm.pending]: (state, action) => ({ ...state, Pending: true }),
  [setSingleFilm.fulfilled]: (state, action) => ({
    ...state,
    Pending: false,
    Movie: action.payload,
  }),
});

export default setFilmsReducer;
