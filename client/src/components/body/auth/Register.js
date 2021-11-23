import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { useDispatch } from "react-redux";
import {
  isEmail,
  isEmpty,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initalState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initalState);
  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password)) {
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });
    }
    if (!isEmail(email)) {
      return setUser({
        ...user,
        err: "Invalid emails.",
        success: "",
      });
    }
    if (isLength(password)) {
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });
    }
    if (!isMatch(password, cf_password)) {
      return setUser({
        ...user,
        err: "Password did not match",
        success: "",
      });
    }
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      setUser({ ...user, err: "", success: res.data.msg });
    } catch (e) {
      e.response.data.msg &&
        setUser({
          ...user,
          err: e.response.data.msg,
          success: "",
        });
    }
  };

  return (
    <div className="login_page">
      <h2>Register</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Enter your name</label>
          <input
            input="text"
            placeholder="Enter name"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
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
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            input="text"
            name="cf_password"
            placeholder="Confirm Password"
            id="cf_password"
            value={cf_password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <button type="submit">Register</button>
        </div>
      </form>
      <p>
        Already an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
