import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initalState = {
  email: "",
  err: "",
  success: "",
};

function ForgotPasword() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState(initalState);
  const { email, err, success } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPasword = async () => {
    if (!isEmail(email)) {
      return setData({ ...data, err: "Invalid emails", success: "" });
    }
    try {
      const res = await axios.post("/user/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="fg_pass">
      <h2>Forgot Your Password?</h2>
      <div className="row">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label htmlFor="email">Enter email address?</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPasword}>Verify your email</button>
      </div>
    </div>
  );
}

export default ForgotPasword;
