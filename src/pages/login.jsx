import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "./../controls/input";
import loginService from "./../services/loginService";
import { connect } from "react-redux";
import ActionTypes from "./../store/actions";

const Login = (props) => {
  const { onUserLogin } = props;
  const history = useHistory();

  const [message, setMessage] = useState("");

  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  const login = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    
    loginService.login(username, password).then((res) => {
      if (res.errorCode > 0) setMessage(res.errorMessage);
      else {
        // clear error message(if any)
        setMessage("");
        // save user info

        onUserLogin(res.data.accessToken, res.data);
        // redirect to home page
        history.push("/home");
      }
    });
  };

  useEffect(() => {
    usernameRef.current.focus();
  }, [usernameRef]);

  return (
    <div className="container h-100" style={{ marginTop: "150px" }}>
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-sm-8 col-lg-5">
          <div className="card bg-primary">
            <div className="card-header text-white">
              <h4 className="card-title mb-0">
                <i className="fas fa-th"></i> Login
              </h4>
            </div>
            <div className="card-body bg-white rounded-bottom">
              <p className="text-center text-danger" id="errMessage">
                {message}
              </p>
              <form>
                <Input
                  loginRef={usernameRef}
                  label="User name"
                  type="text"
                  id="username"
                />
                <Input
                  loginRef={passwordRef}
                  label="Password"
                  type="password"
                  id="password"
                />

                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={login}
                    >
                      <Link
                        to="#"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign in
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onUserLogin: (token, currentUser) =>
    dispatch({
      type: ActionTypes.LOGIN_USER,
      token,
      currentUser,
    }),
});

export default connect(null, mapDispatchToProps)(Login);
