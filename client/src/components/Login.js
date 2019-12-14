import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", input)
      .then(res => {
        console.log("Login.js, POST res: ", res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch(err => {
        console.log(err);
        setErrorMsg(err);
      });
  };

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = e => {
    e.preventDefault();
    setInput({ username: "", password: "" });
  };

  return (
    <>
      <h1 className="welcome">Welcome to the Bubble App!</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={input.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        <button onClick={resetForm}>Clear</button>
      </form>

      {/* {errorMsg ? <h3>{errorMsg}</h3> : null} */}
    </>
  );
};

export default Login;
