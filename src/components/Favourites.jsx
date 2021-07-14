/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { getFav } from "../store/session";
import Card from "./Card";

export default function Favourites() {
  const { favs, user } = useSelector(state => state.user);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(user.id) dispatch(getFav(user.id))
  }, [user])
  return (
    <>
      {favs.length ? <h2 className="my-3 ms-5">This are your favourite Movies:</h2> : ""}
      <div className="row d-flex justify-content-start pt-3 mx-5">
        {favs.length ? (
          favs.map(movie => <Card movie={movie} key={movie.id} />)
        ) : user.id ? (
          <h3 className= ''>Nothing was found...</h3>
        ) : (
          <h3>You must be logged in to see your favourites here!</h3>
        )}
      </div>
    </>
  );
}
