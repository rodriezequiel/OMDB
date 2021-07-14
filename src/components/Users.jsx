/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../store/users";
import { Link } from "react-router-dom";
export default function Users() {
  const { users } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users.length) dispatch(getUsers());
  }, []);

  return (
    <div className='mx-5'>
      <h2 className="my-5 ms-1 ">Click on an user to see his/her favourites:</h2>
      <div className="list-group">
        {users.length ? (
          users.map(user => (
            <Link key={user.id}
              className="list-group-item list-group-item-warning"
              to={`/users/favourites/${user.id}`}
            >
              {user.name}
            </Link>
          ))
        ) : (
          <h2 style={{ margin: "15% 0", textAlign: "center" }}>No user was found</h2>
        )}
      </div>
    </div>
  );
}
