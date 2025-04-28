// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
// import "../Login.css"; // Adjust the path based on where Login.css is stored

// function Login() {
//   const navigate = useNavigate(); // ✅ Initialize navigate
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Add your auth logic here. For now, we assume it's successful.
//     if (username && password) {
//       // ✅ Redirect to dashboard
//       navigate("/dashboard");
//     } else {
//       alert("Please enter both username and password.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           placeholder="Enter your username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css"; // Adjust the path if needed

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Save token to localStorage
        localStorage.setItem("token", data.token);
        console.log("Token saved:", data.token); // Debug log
        navigate("/dashboard");
      } else {
        alert(data.msg || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;