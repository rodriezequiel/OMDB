import React from "react";
import { Link } from "react-router-dom";


export default function Card({ movie }) {
  return (
    <div className="col-lg-3 col-sm-6 pb-4" key={movie.imdbID}>
      <div className="card mx-4 shadow-lg mt-3 bg-body rounded hoverGrow" style={{ width: "auto", minWidth:'200px', maxWidth:'300px'}}>
        <Link
          to={`/movie/${movie.imdbID}`}
          className="list-group-item list-group-item-action"
          style={{ borderColor: "grey", padding: "5px" }}
        >
          <img
            src={movie.Poster && movie.Poster.replace('300','600')}
            className="card-img-top"
            alt="Movie poster"
            style={{ maxHeight: "52vh", minHeight: "52vh" }}
          />
          <div className="card-body pb-0">
            <p style={{fontSize: '0.99rem', lineHeight:'1rem', margin:'0', padding:'0' }}>
              <strong>
                {movie.Title.length > 18
                  ? movie.Title.substring(0, 18) + "..."
                  : movie.Title}
              </strong>
              <br />
              <em style={{fontSize: '0.8rem'}}>{movie.Year}, {movie.Type}</em>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
