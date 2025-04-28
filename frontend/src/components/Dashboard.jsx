import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaPiggyBank, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css"; // Import CSS file

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile for username
        const profileResponse = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setUsername(profile.username || "User");
        } else {
          console.error("Failed to fetch user profile.");
        }

        // Fetch income data
        const incomeResponse = await fetch("http://localhost:5000/api/transactions/incomes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!incomeResponse.ok) {
          throw new Error("Failed to fetch income data.");
        }
        const income = await incomeResponse.json();
        setIncomeData(income);

        // Fetch expense data
        const expensesResponse = await fetch("http://localhost:5000/api/transactions/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!expensesResponse.ok) {
          throw new Error("Failed to fetch expense data.");
        }
        const expenses = await expensesResponse.json();
        setExpenseData(expenses);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for the bar chart (grouping by date for income and expenses)
  const dailyTransactions = {};

  incomeData.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!dailyTransactions[date]) {
      dailyTransactions[date] = { income: 0, expense: 0 };
    }
    dailyTransactions[date].income += item.amount;
  });

  expenseData.forEach((item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!dailyTransactions[date]) {
      dailyTransactions[date] = { income: 0, expense: 0 };
    }
    dailyTransactions[date].expense += item.amount;
  });

  const sortedDates = Object.keys(dailyTransactions).sort((a, b) => new Date(a) - new Date(b));
  const chartLabels = sortedDates;
  const incomeValues = sortedDates.map((date) => dailyTransactions[date].income);
  const expenseValues = sortedDates.map((date) => dailyTransactions[date].expense);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Income",
        data: incomeValues,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Expenses",
        data: expenseValues,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Daily Income vs. Expenses",
      },
    },
  };

  // Calculate total income and expenses for the summary
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - Math.abs(totalExpenses);

  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
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
          <Link to="/dashboard" className="active">
            <MdDashboard /> Dashboard
          </Link>
          <Link to="/income">
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

      {/* Main Dashboard */}
      <div className="main-dashboard">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        {/* Graph Section */}
        <div className="graph-container">
          <h2>Income vs. Expenses</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Summary Section */}
        <div className="summary-container">
          <div className="income-summary">
            <h3>Total Income</h3>
            <p>${totalIncome.toFixed(2)}</p>
          </div>
          <div className="expense-summary">
            <h3>Total Expenses</h3>
            <p>${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="balance-summary">
            <h3>Net Balance</h3>
            <p style={{ color: netBalance >= 0 ? 'green' : 'red' }}>${netBalance.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;