import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaMoneyBillWave, FaPiggyBank, FaChartLine } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import "./Expenses.css";

const Expenses = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [source, setSource] = useState("");
    const [remark, setRemark] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [expenseData, setExpenseData] = useState([]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

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

    useEffect(() => {
        const fetchExpenseData = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }
                const response = await fetch("http://localhost:5000/api/transactions/expenses", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    let errorMessage = "Failed to fetch expense data.";
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.msg || errorMessage;
                    } catch (jsonError) {}
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                setExpenseData(data);
            } catch (error) {
                console.error("Error fetching expense data:", error);
                setError(error.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenseData();
    }, [successMessage]);

    useEffect(() => {
        const total = expenseData.reduce((sum, item) => sum + item.amount, 0);
        setTotalExpense(total);
    }, [expenseData]);

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

            const response = await fetch("http://localhost:5000/api/transactions/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, amount: parseFloat(amount), date, source, remark }),
            });

            if (!response.ok) {
                let errorMessage = "Failed to add expense.";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.msg || errorMessage;
                } catch (jsonError) {}
                throw new Error(errorMessage);
            }

            await response.json();
            setSuccessMessage("Expense added successfully!");
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
        <div className="expenses-container">
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
                    <Link to="/expenses" className="active">
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
                <h1>Expense Management</h1>

                <div className="expense-form-container">
                    <h2>Add New Expense</h2>
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
                        <button type="submit">Add Expense</button>
                    </form>
                </div>

                <div className="expense-list-container">
                    <h2>Expense History</h2>
                    {loading ? (
                        <p>Loading expense data...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        <>
                            <div className="total-expense">
                                Total Expenses: ${totalExpense.toFixed(2)}
                            </div>
                            <div className="expense-list">
                                {expenseData.length > 0 ? (
                                    expenseData.map((expense) => (
                                        <div key={expense._id} className="expense-item">
                                            <div className="expense-details">
                                                <p><strong>{expense.title}</strong></p>
                                                <p>${expense.amount.toFixed(2)}</p>
                                                <p>{new Date(expense.date).toLocaleDateString()}</p>
                                                <p>Source: {expense.source || "N/A"}</p>
                                                <p>{expense.remark}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No expense data available.</p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Expenses;