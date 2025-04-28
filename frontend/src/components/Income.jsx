import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaMoneyBillWave, FaPiggyBank, FaChartLine } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./Income.css";

const Income = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [source, setSource] = useState("");
    const [remark, setRemark] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [incomeData, setIncomeData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(""); // New state

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

    // Fetch income data
    useEffect(() => {
        const fetchIncomeData = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }
                const response = await fetch("http://localhost:5000/api/transactions/incomes", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    let errorMessage = "Failed to fetch income data.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch (jsonError) {}
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setIncomeData(data);
            } catch (error) {
                console.error("Error fetching income data:", error);
                setError(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchIncomeData();
    }, [successMessage]);

    // Calculate total income
    useEffect(() => {
        const total = incomeData.reduce((sum, item) => sum + item.amount, 0);
        setTotalIncome(total);
    }, [incomeData]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!title || !amount || !date) {
            setError("Title, Amount, and Date are required.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found. Please log in again.");
                return;
            }

            const response = await fetch("http://localhost:5000/api/transactions/incomes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, amount: parseFloat(amount), date, source, remark }),
            });

            if (!response.ok) {
                let errorMessage = "Failed to add income.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                } catch (jsonError) {}
                throw new Error(errorMessage);
            }

            await response.json();
            setSuccessMessage("Income added successfully!");
            setTitle("");
            setAmount("");
            setDate("");
            setSource("");
            setRemark("");
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="income-container">
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
                    <Link to="/income" className="active">
                        <FaMoneyBillWave /> Incomes
                    </Link>
                    <Link to="/expenses">
                        <FaPiggyBank /> Expenses
                    </Link>
                    <Link to="/investments">
                        <FaChartLine /> Investments
                    </Link>
                </nav>
                <div className="sign-out-button">
                    <button>
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </div>
            <div className="main-content">
                <h1>Income Management</h1>

                <div className="income-form-container">
                    <h2>Add New Income</h2>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                name="amount"
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                name="date"
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="source">Source:</label>
                            <input
                                type="text"
                                id="source"
                                value={source}
                                name="source"
                                onChange={(e) => setSource(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="remark">Remark:</label>
                            <textarea
                                id="remark"
                                value={remark}
                                name="remark"
                                onChange={(e) => setRemark(e.target.value)}
                            />
                        </div>
                        <button type="submit">Add Income</button>
                    </form>
                </div>

                <div className="income-list-container">
                    <h2>Income History</h2>
                    {loading ? (
                        <p>Loading income data...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <>
                            <div className="total-income">
                                Total Income: ${totalIncome.toFixed(2)}
                            </div>
                            <div className="income-list">
                                {incomeData.length > 0 ? (
                                    incomeData.map((income) => (
                                        <div key={income._id} className="income-item">
                                            <div className="income-details">
                                                <p><strong>{income.title}</strong></p>
                                                <p>${income.amount.toFixed(2)}</p>
                                                <p>{new Date(income.date).toLocaleDateString()}</p>
                                                <p>Source: {income.source || "N/A"}</p>
                                                <p>{income.remark}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No income data available.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Income;
