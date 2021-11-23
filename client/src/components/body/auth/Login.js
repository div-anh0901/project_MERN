import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const initalState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initalState);
  const { email, password, err, success } = user;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      console.log(res);
      setUser({ ...user, err: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (e) {
      e.response.data.msg &&
        setUser({
          ...user,
          err: e.response.data.msg,
          success: "",
        });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            input="text"
            placeholder="Enter email address"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            input="text"
            name="password"
            placeholder="Enter password"
            id="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/forgot_password">Forgot your password?</Link>
        </div>
      </form>

      <div className="hr">Or Login With</div>
      <div className="local">
        <GoogleLogin
          clientId="1015702931529-ia8knim910pts8upp3mj6t96c48b5v0h.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="5048988625122528"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>
      <p>
        New Customer?<Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
