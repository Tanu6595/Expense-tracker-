import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"; // Import Login component
import SignUp from "./components/SignUp"; // Import SignUp component
import "./App.css"; // Import the CSS for the App

function App() {
  return (
    <Router>
      <div className="hero-container">
        {/* Conditionally render Navbar based on route */}
        <ConditionalNavbar />
        {/* Define Routes */}
        <Routes>
          {/* Default Welcome Page */}
          <Route
            path="/"
            element={
              <main className="hero-section">
                <div className="hero-text">
                  <h1>
                    Manage Your Expenses Easily With <span className="highlight">MoneyMap</span>
                  </h1>
                  <p>
                    We provide the easiest way to manage expenses. Get a full view so you know where to save.
                    Track spending, detect fraud, and keep tabs on rising subscription costs.
                  </p>
                  <Link to="/sign-up" className="get-started">
                    Sign Up
                  </Link>
                </div>
                <div className="hero-graphics">
                  <div className="grid-item">
                    <video
                      src="./assets/gif4.mp4"
                      autoPlay
                      loop
                      muted
                      className="graphic"
                    ></video>
                  </div>
                  <div className="grid-item">
                    <video
                      src="./assets/gif5.mp4"
                      autoPlay
                      loop
                      muted
                      className="graphic"
                    ></video>
                  </div>
                </div>
              </main>
            }
          />
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          {/* Sign Up Page */}
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

/**
 * Component to conditionally render the Navbar.
 */
function ConditionalNavbar() {
  return (
    <header className="navbar">
      <div className="logo-container">
        <img src="./assets/logo.png" alt="App Logo" className="logo" />
        <h1 className="brand-name">MoneyMap</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login" className="login-link">Log In</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default App;
