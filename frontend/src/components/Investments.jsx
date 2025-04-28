// src/components/Investments.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaMoneyBillWave, FaPiggyBank, FaChartLine } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./Investments.css"; // Ensure you have this CSS

const Investments = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [purchaseDate, setPurchaseDate] = useState("");
    const [purchaseAmount, setPurchaseAmount] = useState("");
    const [currentValue, setCurrentValue] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [investmentData, setInvestmentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch user profile.");
                const data = await res.json();
                setUsername(data.username || "User");
            } catch (err) {
                console.error("Error fetching username:", err.message);
            }
        };

        fetchUserProfile();
    }, []);

    // Fetch investment data
    useEffect(() => {
        const fetchInvestments = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }
                const response = await fetch("http://localhost:5000/api/transactions/investments", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    let errorMessage = "Failed to fetch investments.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch (jsonError) {}
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setInvestmentData(data);
            } catch (error) {
                console.error("Error fetching investments:", error);
                setError(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvestments();
    }, [successMessage]); // refetch on successful addition

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!name || !purchaseDate || !purchaseAmount) {
            setError("Name, Purchase Date, and Purchase Amount are required.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("No token found. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:5000/api/transactions/investments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ 
                    name, 
                    type, 
                    purchaseDate, 
                    purchaseAmount: parseFloat(purchaseAmount), 
                    currentValue: currentValue ? parseFloat(currentValue) : undefined, 
                    note 
                }),
            });

            if (!response.ok) {
                let errorMessage = "Failed to add investment.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                } catch (jsonError) {}
                throw new Error(errorMessage);
            }

            await response.json();
            setSuccessMessage("Investment added successfully!");
            setName("");
            setType("");
            setPurchaseDate("");
            setPurchaseAmount("");
            setCurrentValue("");
            setNote("");
        } catch (error) {
            console.error("Error adding investment:", error);
            setError(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="investments-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="profile-container">
                    <div className="profile-avatar">{username.charAt(0).toUpperCase()}</div>
                    <div className="profile-info">
                        <h2>{username}</h2>
                        <p>Your Money</p>
                    </div>
                </div>
                <nav className="dashboard-nav">
                    <Link to="/dashboard">
                        <MdDashboard /> Dashboard
                    </Link>
                    <Link to="/income">
                        <FaMoneyBillWave /> Incomes
                    </Link>
                    <Link to="/expenses">
                        <FaPiggyBank /> Expenses
                    </Link>
                    <Link to="/investments" className="active">
                        <FaChartLine /> Investments
                    </Link>
                </nav>
                <div className="sign-out-button">
                    <button>
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <h1>Investment Tracking</h1>

                {/* Investment form */}
                <div className="investment-form-container">
                    <h2>Add New Investment</h2>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type:</label>
                            <input
                                type="text"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="purchaseDate">Purchase Date:</label>
                            <input
                                type="date"
                                id="purchaseDate"
                                value={purchaseDate}
                                onChange={(e) => setPurchaseDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="purchaseAmount">Purchase Amount:</label>
                            <input
                                type="number"
                                id="purchaseAmount"
                                value={purchaseAmount}
                                onChange={(e) => setPurchaseAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentValue">Current Value:</label>
                            <input
                                type="number"
                                id="currentValue"
                                value={currentValue}
                                onChange={(e) => setCurrentValue(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="note">Note:</label>
                            <textarea
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <button type="submit">Add Investment</button>
                    </form>
                </div>

                {/* Investment List */}
                <div className="investment-list-container">
                    <h2>Investment Portfolio</h2>
                    {loading ? (
                        <p>Loading investment data...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <div className="investment-list">
                            {investmentData.length === 0 ? (
                                <p>No investments yet.</p>
                            ) : (
                                investmentData.map((item) => (
                                    <div key={item._id} className="investment-item">
                                        <h3>{item.name}</h3>
                                        <p>Type: {item.type || "N/A"}</p>
                                        <p>Purchase Date: {new Date(item.purchaseDate).toLocaleDateString()}</p>
                                        <p>Purchase Amount: ₹{item.purchaseAmount.toFixed(2)}</p>
                                        {item.currentValue && (
                                            <p>Current Value: ₹{item.currentValue.toFixed(2)}</p>
                                        )}
                                        {item.note && <p>Note: {item.note}</p>}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Investments;
