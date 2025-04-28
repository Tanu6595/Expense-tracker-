import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income"; // New component for Income
import Expenses from "./components/Expenses"; // New component for Expenses
import Investments from "./components/Investments"; // New component for Investments
import "./App.css";

function App() {
  return (
    <Router>
      <div className="hero-container">
        <ConditionalNavbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} /> {/* Renamed default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Main dashboard with transaction summary */}
          <Route path="/income" element={<Income />} /> {/* Page for income management */}
          <Route path="/expenses" element={<Expenses />} /> {/* Page for expense management */}
          <Route path="/investments" element={<Investments />} /> {/* Page for investment tracking */}
        </Routes>
      </div>
    </Router>
  );
}

function WelcomePage() {
  return (
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
          <video src="./assets/gif4.mp4" autoPlay loop muted className="graphic"></video>
        </div>
        <div className="grid-item">
          <video src="./assets/gif5.mp4" autoPlay loop muted className="graphic"></video>
        </div>
      </div>
    </main>
  );
}

function ConditionalNavbar() {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard", "/income", "/expenses", "/investments"];
  if (hideNavbarRoutes.includes(location.pathname)) return null;

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