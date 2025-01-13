import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  const switchAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="container">
      
      <header className="navbar">
        <div className="logo">
          <h1>Expense Tracker</h1>
        </div>
        <div className="auth-links">
          <button className="btn small-btn" onClick={toggleAuthModal}>
            Login
          </button>
          <button className="btn small-btn" onClick={toggleAuthModal}>
            Sign Up
          </button>
        </div>
      </header>

      
      {isAuthModalOpen && (
        <div className="auth-modal">
          <div className="auth-box">
            <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
            <form className="auth-form">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="btn primary-btn">
                {isLoginMode ? "Login" : "Sign Up"}
              </button>
            </form>
            <p className="switch-text">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
              <a href="#" onClick={switchAuthMode}>
                {isLoginMode ? "Sign Up" : "Login"}
              </a>
            </p>
            <button className="btn close-btn" onClick={toggleAuthModal}>
              &times;
            </button>
          </div>
        </div>
      )}

      
      <aside className="sidebar">
        <div className="profile">
          <h3>ABC</h3>
          <p>Your Money</p>
        </div>
        <nav className="nav-links">
          <a href="#" className="active">
            Dashboard
          </a>
          <a href="#">View Transactions</a>
          <a href="#">Incomes</a>
          <a href="#">Expenses</a>
        </nav>
        <button className="signout-btn">Sign Out</button>
      </aside>

      
      <main className="content">
        <h2>Incomes</h2>
        <div className="total-income">
          Total Income: <span className="income-amount">$***</span>
        </div>
        <div className="form-section">
          <form className="income-form">
            <input type="text" placeholder="Salary Title" />
            <input type="number" placeholder="Salary Amount" />
            <input type="date" />
            <select>
              <option>Select Option</option>
              <option>Freelance</option>
              <option>Shopify</option>
              <option>Youtube</option>
            </select>
            <textarea placeholder="Add a Reference"></textarea>
            <button type="submit" className="btn primary-btn">
              + Add Income
            </button>
          </form>
        </div>
        <div className="income-list">
          <div className="income-item">
            <div className="icon globe"></div>
            <div className="details">
              <h4>From Freelance</h4>
              <p>$1300 - 25/02/2023</p>
              <small>From freelance works.</small>
            </div>
            <button className="delete-btn">&times;</button>
          </div>
          <div className="income-item">
            <div className="icon shopify"></div>
            <div className="details">
              <h4>Shopify</h4>
              <p>$8000 - 21/02/2023</p>
              <small>My January Shopify earnings.</small>
            </div>
            <button className="delete-btn">&times;</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
