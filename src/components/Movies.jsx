/* eslint-disable array-callback-return */
import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Search from "./Search";
export default function Movies() {
  const { query } = useSelector((state) => state.movieList);
  return (
    <>
      <Search />
      <div className="row d-flex justify-content-start pt-3 mx-5">
        {query.Response === "True" ? (
          query.Search.map((movie) =>{
          if(movie) return <Card movie={movie} key={movie.imdbID} />
        })
        ) : (
          <h2 style={{ margin: "15% 0", textAlign: "center" }}>Nothing was found...</h2>
        )}
      </div>
    </>
  );
}
