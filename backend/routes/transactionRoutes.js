// const express = require("express");
// const router = express.Router();

// const {
//   addIncome,
//   getAllIncomes,
//   addExpense,
//   getAllExpenses,
//   addInvestment,
//   getAllInvestments,
// } = require("../controllers/transactionController");

// const authMiddleware = require('../middlewares/authMiddleware');
// // const {
// //   validateIncome,
// //   validateExpense,
// //   validateInvestment,
// // } = require("../middlewares/validationMiddleware");

// // Income routes
// // Income routes
// router.post("/incomes", authMiddleware, /*validateIncome,*/ addIncome);  // Commented out
// router.get("/incomes", authMiddleware, getAllIncomes);

// // Expense routes
// router.post("/expenses", authMiddleware, /*validateExpense,*/ addExpense); // Commented out
// router.get("/expenses", authMiddleware, getAllExpenses);

// // Investment routes
// router.post("/investments", authMiddleware, /*validateInvestment,*/ addInvestment); // Commented out
// router.get("/investments", authMiddleware, getAllInvestments);

// module.exports = router;
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); // Make sure the path is correct
const { addIncome, getIncomes, addExpense, getExpenses, addInvestment, getInvestments } = require("../controllers/transactionController"); // Correct Path

router.post("/incomes", authMiddleware, addIncome);
router.get("/incomes",authMiddleware,getIncomes);

router.post("/expenses",authMiddleware,addExpense);
router.get("/expenses",authMiddleware,getExpenses);
router.post("/investments",authMiddleware,addInvestment);
router.get("/investments",authMiddleware,getInvestments);
router.get("/test", (req, res) => {
  res.send("Test route");
});

module.exports = router;