// eslint-disable-next-line no-unused-vars
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import movieListReducer from './movies'
import sessionReducer from './session'
import usersReducer from './users'


export default configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        movieList: movieListReducer,
        user: sessionReducer, 
        users: usersReducer,
    },
})  