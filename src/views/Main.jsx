/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Movies from '../components/Movies'
import Favourites from '../components/Favourites'
import Users from '../components/Users';
import UserFavs from '../components/UsersFavs';
import Header from './Header';
import Register from './Register'
import Access from './Access'
import Movie from './Movie'
import '../assets/index.css'

import { useDispatch} from 'react-redux';
import { fetchUser} from '../store/session';

export default function Main() {
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(fetchUser());
    }, [])

    return(
        < >
            <Header/>
            <Switch>
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/favourites" component={Favourites} />
                <Route exact path='/movie/:id' render={({match})=> <Movie match={match}/>} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/access' component={Access} />
                <Route exact path='/users' component={Users}/>
                <Route exact path='/users/favourites/:id' render={({match}) => <UserFavs match={match}/>}/>
                <Redirect from="/" to="/movies" />
            </Switch> 
        </>
    )
}