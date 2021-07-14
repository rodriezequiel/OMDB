import React from "react";
import { useDispatch } from "react-redux";
import { setFilms } from "../store/movies";

export default function Search() {
  const dispatch = useDispatch();
  return (
    <header className="pb-2 pt-2 bg-light border-bottom">
      <div className="container d-flex flex-wrap justify-content-center">
        <form
          className="col-12 mb-3 form-content"
          onChange={({ target }) => dispatch(setFilms((target.value)))}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
      </div>
    </header>
  );
}
