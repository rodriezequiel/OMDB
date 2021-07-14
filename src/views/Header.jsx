/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../store/session";

export default function Header() {
  const { success, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = event => {
    event.preventDefault();
    dispatch(logoutUser());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid shadow-sm pb-2 mb-2 bg-white rounded">
        <Link className="navbar-brand ms-auto" to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Omdb-logo.png"
            alt="OMDB"
            height="50"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mt-2 ms-5 align-items-center">
            <li className="d-flex nav-item me-2">
              <Link className="nav-link active " aria-current="page" to="/movies">
                Search
              </Link>
            </li>
            <li className="d-flex nav-item me-2 ">
              <Link className="nav-link active " aria-current="page" to="/favourites">
                Favourites
              </Link>
            </li>
            <li className="d-flex nav-item me-0">
              <Link className="nav-link active " aria-current="page" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mt-2 me-4 ms-0 align-items-center">
            {!success ? (
              <>
                <li className="nav-item mx-2">
                  <Link className="nav-link active" aria-current="page" to="/access">
                    <button type="button" className="btn btn-outline-dark p-2">
                      Log In
                    </button>
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button type="button" className="btn btn-dark p-0">
                    <Link className="nav-link active text-light" aria-current="page" to="/register">
                      Register
                    </Link>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="d-flex nav-item me-3">
                  <p className="nav-item my-auto active " aria-current="page" to="/users">
                    {user.name}
                  </p>
                </li>
                <div className="flex-shrink-0 dropdown">
                  <a
                    href="#"
                    className="d-block link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser2">
                    <li>
                      <button className="dropdown-item" onClick={handleLogOut} >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
