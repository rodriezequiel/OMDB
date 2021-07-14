/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFav } from "../store/session";
import Card from "./Card";

export default function UserFavs({ match }) {
  const { favs } = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (match) dispatch(getFav(match.params.id));
  }, []);
  return (
    <>
      {favs.length ? <h2 className="my-3 ms-5">This are {users.filter(e => e.id === parseInt(match.params.id))[0].name}'s favourite Movies:</h2> : ""}
      <div className="row d-flex justify-content-start pt-3 mx-5">
        {favs.length ? (
          favs.map(movie => <Card movie={movie} key={movie.id} />)
        ) : (
          <h3 className="">Nothing was found...</h3>
        )}
      </div>
    </>
  );
}
