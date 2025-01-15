import React from "react";
import "../Login.css"; // Adjust the path based on where Login.css is stored

function Login() {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Enter your username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
