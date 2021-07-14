import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import {loginUser, getFav} from "../store/session";
import LoginRegistForm from "../components/LoginRegistForm";

export default function Access() {
  const [userImput, setUser] = useState({ name: "", password: "" });
  const {success, user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = ({ target }) => setUser({ ...userImput, [target.name]: target.value });

  const submitHandler = event => {
    event.preventDefault();
    dispatch(loginUser(userImput));
  };
  //redireccion cuando se efectua el registro
  setTimeout(() => {
    if (success) {
      dispatch(getFav(user.id));
      history.push("/movies")
    }
  }, 1000);

  return (
    <LoginRegistForm isLogIn={true} changeHandler={changeHandler} submitHandler={submitHandler} />
  );
}
