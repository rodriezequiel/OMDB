import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { message } from "antd";

import { setSingleFilm } from "../store/movies";
import { addFav, deleteFav, getFav } from "../store/session";

export default function Movie({ match }) {
  const dispatch = useDispatch();
  const { Pending, Movie } = useSelector(state => state.movieList);
  const { user, favs, pending } = useSelector(state => state.user);
  const { Poster, Title, imdbID, Type, Year } = Movie;

  useEffect(() => {
    dispatch(setSingleFilm(match));
    if (user.id) dispatch(getFav(user.id));
  }, [dispatch, match, user]);

  const handleFav = e => {
    if (user.id) {
      if (e.target.checked)
        dispatch(
          addFav({
            userID: user.id,
            movie: {
              Poster,
              Title,
              imdbID,
              Type,
              Year,
            },
          })
        );
      else {
        dispatch(deleteFav({ imdbID, userId: user.id }));
      }
    } else {
      e.preventDefault();
      message.error("You must be loged in to add favourites!");
    }
  };

  if (!Pending) {
    return (
      <div className="row d-flex justify-content-evenly pt-5 mx-5">
        <div className="col-3 pb-0 mb0">
          <img
            src={Movie.Poster && Movie.Poster.replace("300", "800")}
            className="rounded shadow-lg p-2 mb-5 bg-body rounded hoverGrow"
            alt="Movie poster"
            style={{ height: "65vh", width: "auto", maxWidth: "100%" }}
          />
        </div>
        <div className="col-9 pb-0 mb0 me-0">
          <div className="row d-flex justify-content-between">
            <div className="col-9 pb-0 mb-0 mt-1">
              <h1 className="fs-2" style={{ display: "inline" }}>
                <strong>{Movie.Title}</strong>
              </h1>
              <span>
                {" "}
                <em>
                  {Movie.Runtime}, {Movie.Genre}
                </em>
              </span>
              <br />
            </div>
            <div className=" d-flex col-3 pb-0 my-auto justify-content-center hoverGrow">
              {!pending ? (
                <>
                  <input
                    type="checkbox"
                    className="btn-check"
                    name="favs"
                    id="btn-check-outlined"
                    autoComplete="on"
                    onClick={handleFav}
                    defaultChecked={favs.map(fav => fav.imdbID).includes(imdbID) ? true : false}
                  />
                  <label
                    className="btn btn-outline-warning py-0 hoverGrow"
                    htmlFor="btn-check-outlined"
                    data-bs-toggle="tooltip"
                    data-bs-html="true"
                    data-bs-placement="left"
                    title="Add to Favourites"
                  >
                    <span style={{ fontSize: "1.5rem" }}>★</span>
                  </label>
                </>
              ) : (
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </div>
          </div>
          <p style={{ fontSize: "0.9rem" }}>
            {Movie.Released} - <span style={{ color: "gold", fontSize: "1.5rem" }}>★</span>{" "}
            <span style={{ fontSize: "1.2rem" }}>{Movie.imdbRating}</span>/10 - {Movie.imdbVotes}{" "}
            votes
          </p>
          <p>{Movie.Plot}</p>
          <p>
            <strong>Director: </strong>
            {Movie.Director}
          </p>
          <p>
            <strong>Stars: </strong>
            {Movie.Actors}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <em>
              <strong>Country: </strong>
              {Movie.Country} - <strong>Language: </strong>
              {Movie.Language}
            </em>
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <em>
              <strong>Box Office: </strong>
              {Movie.BoxOffice}
            </em>
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <em>©{Movie.Production}</em>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className=" d-flex spinner-border text-warning justify-content-center"
      style={{ margin: "15% auto", textAlign: "center", width: '4em', height: '4em'}}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
