const { Income, Expense, Investment } = require('../models/Transaction'); // Import the models from transaction.js

// --- Income Controllers ---
const addIncome = async (req, res) => {
    try {
        const { title, amount, date, source, note } = req.body;
        const userId = req.userId; //  still needs userId

        const newIncome = new Income({ userId, title, amount, date, source, note });
        const savedIncome = await newIncome.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ message: 'Failed to add income' });
    }
};

const getIncomes = async (req, res) => {
    try {
        const userId = req.userId; //  still needs userId
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Failed to fetch incomes' });
    }
};


// --- Expense Controllers ---
const addExpense = async (req, res) => {
    try {
        const { title, amount, date, source, note } = req.body;
        const userId = req.userId;

        const newExpense = new Expense({ userId, title, amount: -Math.abs(amount), date, source, note }); // Ensure amount is negative
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Failed to add expense' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const userId = req.userId;
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
};



// --- Investment Controllers ---
const addInvestment = async (req, res) => {
    try {
        const { name, type, purchaseDate, purchaseAmount, quantity, currentValue, notes } = req.body;
        const userId = req.userId;

        const newInvestment = new Investment({ userId, name, type, purchaseDate, purchaseAmount, quantity, currentValue, notes });
        const savedInvestment = await newInvestment.save();
        res.status(201).json(savedInvestment);
    } catch (error) {
        console.error('Error adding investment:', error);
        res.status(500).json({ message: 'Failed to add investment' });
    }
};

const getInvestments = async (req, res) => {
    try {
        const userId = req.userId;
        const investments = await Investment.find({ userId }).sort({ purchaseDate: -1 });
        res.status(200).json(investments);
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).json({ message: 'Failed to fetch investments' });
    }
};



module.exports = {
    addIncome,
    getIncomes,
    addExpense,
    getExpenses,
    addInvestment,
    getInvestments,
};
