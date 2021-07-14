import React from 'react';

export default function LoginRegistForm({isLogIn, changeHandler, submitHandler}){
    return(
        <div className="form-body ">
      <div className="row">
        <div className="form-holder ">
          <div className="form-content">
            <div className="form-items">
              <h3>{(isLogIn)? "Log In":"Register"}</h3>
              <p>Fill in the data below.</p>
              <form onChange={e => changeHandler(e)} onSubmit={e => submitHandler(e)}>
                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Username"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="form-button mt-3">
                  <button id="submit" type="submit" className="btn btn-primary">
                  {(isLogIn)? "Log In":"Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}